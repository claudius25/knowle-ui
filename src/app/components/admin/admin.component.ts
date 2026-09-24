import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  DbActivity,
  DbCategory,
  DbChapter,
  DbChapterFile,
  DbItem,
  DbOption,
  DbPair,
} from '../../shared/services/content-database.service';
import { ActivityType, Difficulty } from '../../shared/models/game.types';
import { MapChapterEntry, MapDefinition } from '../../shared/services/map.service';
import { UiTextService } from '../../shared/services/ui-text.service';

interface ActiveTranslationModal {
  key: string;
  ro: string;
  en: string;
  title?: string;
}

/** Everything stored under /db/{difficulty}/{domain}/{chapterId}/ for one chapter. */
interface ChapterBundle {
  chapter: DbChapter;
  ro: Record<string, string>;
  en: Record<string, string>;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  protected readonly uiText = inject(UiTextService);

  // Selector state
  protected difficulty: Difficulty = 'EASY';
  protected domain = 'geography';

  // Chapters come from the shared map, their content from one folder per chapter
  protected chapterMap: MapDefinition = { version: 1, chapters: [] };

  /** Loaded content, keyed by chapter id. */
  private readonly bundles = new Map<string, ChapterBundle>();

  // UI state
  protected activeTab: 'editor' | 'translations' | 'raw' = 'editor';
  protected selectedChapterIndex = 0;
  protected selectedActivityIndex = -1;
  protected statusMessage = '';
  protected isError = false;

  // Translation popup modal state
  protected modalData: ActiveTranslationModal | null = null;
  protected modalSearchFilter = '';
  protected modalTranslating = false;
  protected readonly translatingKeys = new Set<string>();

  // Supported activity types
  protected readonly activityTypes: ActivityType[] = [
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'CLASSIFY',
    'MATCHING',
    'ORDERING',
    'PUZZLE',
  ];

  // Activity types that expose a hint to the player
  private readonly hintActivityTypes: ActivityType[] = [
    'MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'CLASSIFY',
    'ORDERING',
  ];

  protected supportsHint(type: ActivityType): boolean {
    return this.hintActivityTypes.includes(type);
  }

  ngOnInit(): void {
    this.loadCurrentDatabase();
  }

  /** Chapters declared in map.json, the single source of truth for the chapter list. */
  protected get mapChapters(): MapChapterEntry[] {
    return this.chapterMap.chapters;
  }

  protected get currentMapChapter(): MapChapterEntry | null {
    return this.chapterMap.chapters[this.selectedChapterIndex] ?? null;
  }

  /** Folder holding the content of a chapter, relative to the app root. */
  protected chapterFolder(chapterId: string): string {
    return `/db/${this.difficulty.toLowerCase()}/${this.domain.toLowerCase().trim()}/${chapterId}`;
  }

  /** Content of a map chapter, created empty on first use. */
  private bundleOf(entry: MapChapterEntry): ChapterBundle {
    let bundle = this.bundles.get(entry.id);
    if (!bundle) {
      bundle = this.emptyBundle(entry);
      this.bundles.set(entry.id, bundle);
    }
    return bundle;
  }

  private emptyBundle(entry: MapChapterEntry): ChapterBundle {
    return {
      chapter: {
        id: entry.id,
        title: `${entry.id}_title`,
        description: `${entry.id}_desc`,
        activities: [],
      },
      ro: {},
      en: {},
    };
  }

  protected chapterOf(entry: MapChapterEntry): DbChapter {
    return this.bundleOf(entry).chapter;
  }

  protected get currentChapter(): DbChapter | null {
    const entry = this.currentMapChapter;
    return entry ? this.chapterOf(entry) : null;
  }

  /** Dictionaries of the selected chapter; the editor always writes into these. */
  protected get translations(): { ro: Record<string, string>; en: Record<string, string> } {
    const entry = this.currentMapChapter;
    return entry ? this.bundleOf(entry) : { ro: {}, en: {} };
  }

  /** Reloads map.json and the content folder of every chapter it declares. */
  protected loadCurrentDatabase(): void {
    const diff = this.difficulty.toLowerCase();
    const dom = this.domain.toLowerCase().trim();
    this.statusMessage = `Încărcare /db/${diff}/${dom}/...`;
    this.isError = false;

    this.http
      .get<MapDefinition>('/map.json')
      .pipe(catchError(() => of({ version: 1, chapters: [] } as MapDefinition)))
      .subscribe((definition) => {
        this.chapterMap = definition;
        this.bundles.clear();
        this.selectedChapterIndex = 0;
        this.selectedActivityIndex = -1;
        this.loadBundles(definition.chapters);
      });
  }

  private loadBundles(entries: MapChapterEntry[]): void {
    if (entries.length === 0) {
      this.statusMessage = 'map.json nu conține niciun capitol.';
      return;
    }

    forkJoin(entries.map((entry) => this.loadBundle(entry))).subscribe((results) => {
      results.forEach(({ entry, bundle }) => this.bundles.set(entry.id, bundle));
      const missing = results.filter((r) => !r.found).map((r) => r.entry.id);
      this.statusMessage = missing.length
        ? `Capitole încărcate. Fără db.json încă: ${missing.join(', ')}.`
        : `Datele pentru ${this.difficulty}/${this.domain} au fost încărcate cu succes.`;
      this.isError = false;
    });
  }

  private loadBundle(entry: MapChapterEntry) {
    const folder = this.chapterFolder(entry.id);
    const dict = (lang: 'ro' | 'en') =>
      this.http
        .get<Record<string, string>>(`${folder}/i18n/${lang}.json`)
        .pipe(catchError(() => of({} as Record<string, string>)));

    return forkJoin({
      file: this.http.get<DbChapterFile>(`${folder}/db.json`).pipe(catchError(() => of(null))),
      ro: dict('ro'),
      en: dict('en'),
    }).pipe(
      map(({ file, ro, en }) => ({
        entry,
        found: file !== null,
        bundle: {
          chapter: file?.chapter ?? this.emptyBundle(entry).chapter,
          ro: { ...ro },
          en: { ...en },
        } satisfies ChapterBundle,
      })),
    );
  }

  /** Empties the content of the selected chapter, keeping its map entry. */
  protected initEmptyDatabase(): void {
    const entry = this.currentMapChapter;
    if (!entry) {
      return;
    }
    this.bundles.set(entry.id, this.emptyBundle(entry));
    this.selectedActivityIndex = -1;
  }

  // --- Chapter Operations (map.json is the source of truth) ---
  protected addChapter(): void {
    const dom = this.domain.toLowerCase();
    const chapterNum = this.chapterMap.chapters.length + 1;
    const chapterId = `${dom}_chapter_${chapterNum}`;

    const entry: MapChapterEntry = {
      id: chapterId,
      title: `mapChapter${chapterNum}Title`,
      subtitle: `mapChapter${chapterNum}Subtitle`,
      icon: '📘',
    };

    this.chapterMap.chapters.push(entry);
    this.bundles.set(entry.id, this.emptyBundle(entry));
    this.selectedChapterIndex = this.chapterMap.chapters.length - 1;
    this.selectedActivityIndex = -1;
  }

  protected removeChapter(index: number): void {
    const entry = this.chapterMap.chapters[index];
    if (!entry || !confirm(`Ești sigur că vrei să ștergi capitolul "${entry.id}"?`)) {
      return;
    }

    this.chapterMap.chapters.splice(index, 1);
    this.bundles.delete(entry.id);

    if (this.selectedChapterIndex >= this.chapterMap.chapters.length) {
      this.selectedChapterIndex = Math.max(0, this.chapterMap.chapters.length - 1);
    }
    this.selectedActivityIndex = -1;
  }

  /** Keeps the content folder key aligned when its map entry is renamed. */
  protected renameChapter(entry: MapChapterEntry, newId: string): void {
    const bundle = this.bundleOf(entry);
    this.bundles.delete(entry.id);
    entry.id = newId;
    bundle.chapter.id = newId;
    this.bundles.set(newId, bundle);
  }

  protected selectChapter(index: number): void {
    this.selectedChapterIndex = index;
    this.selectedActivityIndex = -1;
  }

  // --- Activity list selection ---
  protected selectActivity(index: number): void {
    this.selectedActivityIndex = this.selectedActivityIndex === index ? -1 : index;
  }

  // --- Activity Operations ---
  protected addActivity(chapter: DbChapter, type: ActivityType = 'MULTIPLE_CHOICE'): void {
    const diff = this.difficulty.toLowerCase();
    const dom = this.domain.toLowerCase();
    const totalActivities = [...this.bundles.values()].reduce(
      (acc, b) => acc + b.chapter.activities.length,
      0,
    );
    const actNum = totalActivities + 1;
    const actId = `${diff}_${dom}_${actNum}`;

    const titleKey = `${actId}_title`;
    const descKey = `${actId}_desc`;
    const questionKey = `${actId}_question`;
    const hintKey = `${actId}_hint`;

    this.translations.ro[titleKey] = `Activitatea ${actNum}`;
    this.translations.ro[descKey] = `Informație introductivă pentru activitatea ${actNum}.`;
    this.translations.ro[questionKey] = `Întrebarea activității ${actNum}?`;

    this.translations.en[titleKey] = `Activity ${actNum}`;
    this.translations.en[descKey] = `Introductory concept for activity ${actNum}.`;
    this.translations.en[questionKey] = `Question for activity ${actNum}?`;

    if (this.supportsHint(type)) {
      this.translations.ro[hintKey] = `Indiciu util pentru răspuns.`;
      this.translations.en[hintKey] = `Helpful hint.`;
    }

    let newActivity: DbActivity;

    switch (type) {
      case 'MULTIPLE_CHOICE': {
        const op1Key = `${actId}_op_1`;
        const op2Key = `${actId}_op_2`;
        const op3Key = `${actId}_op_3`;

        this.translations.ro[op1Key] = 'Opțiunea 1';
        this.translations.ro[op2Key] = 'Opțiunea 2 (Corectă)';
        this.translations.ro[op3Key] = 'Opțiunea 3';

        this.translations.en[op1Key] = 'Option 1';
        this.translations.en[op2Key] = 'Option 2 (Correct)';
        this.translations.en[op3Key] = 'Option 3';

        newActivity = {
          id: actId,
          type: 'MULTIPLE_CHOICE',
          title: titleKey,
          description: descKey,
          question: questionKey,
          hint: hintKey,
          isPractical: false,
          options: [
            { id: 'a', text: op1Key },
            { id: 'b', text: op2Key },
            { id: 'c', text: op3Key },
          ],
          answer: 'b',
          reward: { coins: 10, energy: 0 },
        };
        break;
      }

      case 'TRUE_FALSE': {
        newActivity = {
          id: actId,
          type: 'TRUE_FALSE',
          title: titleKey,
          description: descKey,
          question: questionKey,
          hint: hintKey,
          isPractical: false,
          answer: true,
          reward: { coins: 10, energy: 0 },
        };
        break;
      }

      case 'CLASSIFY': {
        const cat1Key = `${actId}_cat_1`;
        const cat2Key = `${actId}_cat_2`;
        const item1Key = `${actId}_item_1`;
        const item2Key = `${actId}_item_2`;

        this.translations.ro[cat1Key] = 'Categoria 1';
        this.translations.ro[cat2Key] = 'Categoria 2';
        this.translations.ro[item1Key] = 'Element 1';
        this.translations.ro[item2Key] = 'Element 2';

        this.translations.en[cat1Key] = 'Category 1';
        this.translations.en[cat2Key] = 'Category 2';
        this.translations.en[item1Key] = 'Item 1';
        this.translations.en[item2Key] = 'Item 2';

        newActivity = {
          id: actId,
          type: 'CLASSIFY',
          title: titleKey,
          description: descKey,
          question: questionKey,
          hint: hintKey,
          isPractical: false,
          categories: [
            { id: 'cat_1', label: cat1Key },
            { id: 'cat_2', label: cat2Key },
          ],
          items: [
            { id: 'item_1', label: item1Key },
            { id: 'item_2', label: item2Key },
          ],
          answer: {
            item_1: 'cat_1',
            item_2: 'cat_2',
          },
          reward: { coins: 15, energy: 0 },
        };
        break;
      }

      case 'MATCHING': {
        const l1Key = `${actId}_left_1`;
        const r1Key = `${actId}_right_1`;
        const l2Key = `${actId}_left_2`;
        const r2Key = `${actId}_right_2`;

        this.translations.ro[l1Key] = 'Element Stânga 1';
        this.translations.ro[r1Key] = 'Element Dreapta 1';
        this.translations.ro[l2Key] = 'Element Stânga 2';
        this.translations.ro[r2Key] = 'Element Dreapta 2';

        this.translations.en[l1Key] = 'Left Item 1';
        this.translations.en[r1Key] = 'Right Item 1';
        this.translations.en[l2Key] = 'Left Item 2';
        this.translations.en[r2Key] = 'Right Item 2';

        newActivity = {
          id: actId,
          type: 'MATCHING',
          title: titleKey,
          description: descKey,
          question: questionKey,
          isPractical: false,
          pairs: [
            { id: 'pair_1', left: l1Key, right: r1Key },
            { id: 'pair_2', left: l2Key, right: r2Key },
          ],
          answer: [
            { left: l1Key, right: r1Key },
            { left: l2Key, right: r2Key },
          ],
          reward: { coins: 15, energy: 0 },
        };
        break;
      }

      case 'ORDERING': {
        const item1Key = `${actId}_item_1`;
        const item2Key = `${actId}_item_2`;
        const item3Key = `${actId}_item_3`;

        this.translations.ro[item1Key] = 'Pasul 1 (Primul)';
        this.translations.ro[item2Key] = 'Pasul 2 (Mijloc)';
        this.translations.ro[item3Key] = 'Pasul 3 (Ultimul)';

        this.translations.en[item1Key] = 'Step 1 (First)';
        this.translations.en[item2Key] = 'Step 2 (Middle)';
        this.translations.en[item3Key] = 'Step 3 (Last)';

        newActivity = {
          id: actId,
          type: 'ORDERING',
          title: titleKey,
          description: descKey,
          question: questionKey,
          hint: hintKey,
          isPractical: false,
          items: [
            { id: 'item_1', text: item1Key },
            { id: 'item_2', text: item2Key },
            { id: 'item_3', text: item3Key },
          ],
          answer: ['item_1', 'item_2', 'item_3'],
          reward: { coins: 15, energy: 0 },
        };
        break;
      }

      case 'PUZZLE': {
        const op1Key = `${actId}_op_1`;
        const op2Key = `${actId}_op_2`;
        const op3Key = `${actId}_op_3`;

        this.translations.ro[op1Key] = 'Opțiunea 1';
        this.translations.ro[op2Key] = 'Opțiunea 2 (Corectă)';
        this.translations.ro[op3Key] = 'Opțiunea 3';

        this.translations.en[op1Key] = 'Option 1';
        this.translations.en[op2Key] = 'Option 2 (Correct)';
        this.translations.en[op3Key] = 'Option 3';

        newActivity = {
          id: actId,
          type: 'PUZZLE',
          title: titleKey,
          description: descKey,
          question: questionKey,
          isPractical: false,
          pictures: [],
          options: [
            { id: 'a', text: op1Key },
            { id: 'b', text: op2Key },
            { id: 'c', text: op3Key },
          ],
          answer: 'b',
          reward: { coins: 15, energy: 0 },
        };
        break;
      }

      default:
        newActivity = {
          id: actId,
          type,
          title: titleKey,
          description: descKey,
          question: questionKey,
          isPractical: false,
          answer: '',
          reward: { coins: 10, energy: 0 },
        };
    }

    chapter.activities.push(newActivity);
    this.selectedActivityIndex = chapter.activities.length - 1;
  }

  protected removeActivity(chapter: DbChapter, index: number): void {
    if (confirm(`Ești sigur că vrei să ștergi activitatea "${chapter.activities[index].id}"?`)) {
      chapter.activities.splice(index, 1);
      if (this.selectedActivityIndex === index) {
        this.selectedActivityIndex = -1;
      } else if (this.selectedActivityIndex > index) {
        this.selectedActivityIndex--;
      }
    }
  }

  protected moveActivity(chapter: DbChapter, index: number, direction: 'up' | 'down'): void {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= chapter.activities.length) return;
    const temp = chapter.activities[index];
    chapter.activities[index] = chapter.activities[targetIndex];
    chapter.activities[targetIndex] = temp;
  }

  protected changeActivityType(activity: DbActivity, newType: ActivityType): void {
    activity.type = newType;
    if (!this.supportsHint(newType)) {
      delete activity.hint;
    }
    if ((newType === 'MULTIPLE_CHOICE' || newType === 'PUZZLE') && !activity.options) {
      activity.options = [
        { id: 'a', text: `${activity.id}_op_1` },
        { id: 'b', text: `${activity.id}_op_2` },
      ];
      activity.answer = 'a';
    } else if (newType === 'TRUE_FALSE') {
      activity.answer = true;
    } else if (newType === 'CLASSIFY' && !activity.categories) {
      activity.categories = [
        { id: 'cat_1', label: `${activity.id}_cat_1` },
        { id: 'cat_2', label: `${activity.id}_cat_2` },
      ];
      activity.items = [
        { id: 'item_1', label: `${activity.id}_item_1` },
        { id: 'item_2', label: `${activity.id}_item_2` },
      ];
      activity.answer = { item_1: 'cat_1', item_2: 'cat_2' };
    } else if (newType === 'MATCHING' && !activity.pairs) {
      activity.pairs = [
        { id: 'pair_1', left: `${activity.id}_left_1`, right: `${activity.id}_right_1` },
      ];
      activity.answer = [{ left: `${activity.id}_left_1`, right: `${activity.id}_right_1` }];
    } else if (newType === 'ORDERING' && !activity.items) {
      activity.items = [
        { id: 'item_1', text: `${activity.id}_item_1` },
        { id: 'item_2', text: `${activity.id}_item_2` },
      ];
      activity.answer = ['item_1', 'item_2'];
    }
  }

  // --- Sub-item operations ---
  protected addOption(activity: DbActivity): void {
    if (!activity.options) activity.options = [];
    const nextChar = String.fromCharCode(97 + activity.options.length); // a, b, c, d...
    const opKey = `${activity.id}_op_${activity.options.length + 1}`;
    activity.options.push({ id: nextChar, text: opKey });
    this.translations.ro[opKey] = `Opțiunea ${nextChar.toUpperCase()}`;
    this.translations.en[opKey] = `Option ${nextChar.toUpperCase()}`;
  }

  protected removeOption(activity: DbActivity, index: number): void {
    if (activity.options) {
      activity.options.splice(index, 1);
    }
  }

  protected addCategory(activity: DbActivity): void {
    if (!activity.categories) activity.categories = [];
    const catNum = activity.categories.length + 1;
    const catId = `cat_${catNum}`;
    const catKey = `${activity.id}_cat_${catNum}`;
    activity.categories.push({ id: catId, label: catKey });
    this.translations.ro[catKey] = `Categoria ${catNum}`;
    this.translations.en[catKey] = `Category ${catNum}`;
  }

  protected removeCategory(activity: DbActivity, index: number): void {
    if (activity.categories) {
      activity.categories.splice(index, 1);
    }
  }

  protected addClassifyItem(activity: DbActivity): void {
    if (!activity.items) activity.items = [];
    const itemNum = activity.items.length + 1;
    const itemId = `item_${itemNum}`;
    const itemKey = `${activity.id}_item_${itemNum}`;
    activity.items.push({ id: itemId, label: itemKey });

    const defaultCat = activity.categories?.[0]?.id || 'cat_1';
    if (!activity.answer || typeof activity.answer !== 'object') {
      activity.answer = {};
    }
    (activity.answer as Record<string, string>)[itemId] = defaultCat;

    this.translations.ro[itemKey] = `Element ${itemNum}`;
    this.translations.en[itemKey] = `Item ${itemNum}`;
  }

  protected removeClassifyItem(activity: DbActivity, index: number): void {
    if (activity.items) {
      const removed = activity.items.splice(index, 1)[0];
      if (removed && typeof activity.answer === 'object' && activity.answer !== null) {
        delete (activity.answer as Record<string, string>)[removed.id];
      }
    }
  }

  protected updateClassifyAnswer(activity: DbActivity, itemId: string, catId: string): void {
    if (!activity.answer || typeof activity.answer !== 'object') {
      activity.answer = {};
    }
    (activity.answer as Record<string, string>)[itemId] = catId;
  }

  protected getClassifyAnswer(activity: DbActivity, itemId: string): string {
    if (activity.answer && typeof activity.answer === 'object') {
      return (activity.answer as Record<string, string>)[itemId] || '';
    }
    return '';
  }

  protected addPair(activity: DbActivity): void {
    if (!activity.pairs) activity.pairs = [];
    const pairNum = activity.pairs.length + 1;
    const leftKey = `${activity.id}_left_${pairNum}`;
    const rightKey = `${activity.id}_right_${pairNum}`;
    activity.pairs.push({ id: `pair_${pairNum}`, left: leftKey, right: rightKey });
    this.translations.ro[leftKey] = `Stânga ${pairNum}`;
    this.translations.ro[rightKey] = `Dreapta ${pairNum}`;
    this.translations.en[leftKey] = `Left ${pairNum}`;
    this.translations.en[rightKey] = `Right ${pairNum}`;
  }

  protected removePair(activity: DbActivity, index: number): void {
    if (activity.pairs) activity.pairs.splice(index, 1);
  }

  protected addOrderingItem(activity: DbActivity): void {
    if (!activity.items) activity.items = [];
    const itemNum = activity.items.length + 1;
    const itemId = `item_${itemNum}`;
    const itemKey = `${activity.id}_item_${itemNum}`;
    activity.items.push({ id: itemId, text: itemKey });
    if (Array.isArray(activity.answer)) {
      activity.answer.push(itemId);
    } else {
      activity.answer = [itemId];
    }
    this.translations.ro[itemKey] = `Pasul ${itemNum}`;
    this.translations.en[itemKey] = `Step ${itemNum}`;
  }

  protected removeOrderingItem(activity: DbActivity, index: number): void {
    if (activity.items) {
      const removed = activity.items.splice(index, 1)[0];
      if (removed && Array.isArray(activity.answer)) {
        activity.answer = activity.answer.filter((id) => id !== removed.id);
      }
    }
  }

  // --- Picture operations ---
  protected getPicturesString(activity: DbActivity): string {
    return activity.pictures?.join(', ') ?? '';
  }

  protected updatePicturesFromString(activity: DbActivity, raw: string): void {
    if (!raw || !raw.trim()) {
      delete activity.pictures;
      return;
    }
    activity.pictures = raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  protected getPuzzleImageUrl(activity: DbActivity): string {
    const picture = activity.pictures?.[0];
    const chapterId = this.currentMapChapter?.id;
    if (!picture || !chapterId) {
      return '';
    }
    if (picture.startsWith('/') || picture.startsWith('http')) {
      return picture;
    }
    return `${this.chapterFolder(chapterId)}/pics/${picture}`;
  }

  // --- Translation Modal Popup ---
  protected openTranslationModal(key: string, title?: string): void {
    if (!key) return;
    this.modalData = {
      key,
      ro: this.translations.ro[key] ?? '',
      en: this.translations.en[key] ?? '',
      title: title || `Editare text: ${key}`,
    };
  }

  protected saveTranslationModal(): void {
    if (!this.modalData) return;
    const { key, ro, en } = this.modalData;
    this.translations.ro[key] = ro;
    this.translations.en[key] = en;
    this.closeTranslationModal();
  }

  protected closeTranslationModal(): void {
    this.modalData = null;
  }

  // --- Automatic RO -> EN translation ---
  /** Calls the gnosy-deepl proxy service (which forwards to DeepL) to translate Romanian text to English. */
  private requestAutoTranslation(text: string): Promise<string> {
    const url = `${environment.translateApiUrl}/translate`;
    const body = { textContent: text, language: 'ro' };

    return firstValueFrom(this.http.post<{ translatedText?: string }>(url, body)).then(
      (res) => res?.translatedText?.trim() ?? '',
    );
  }

  protected autoTranslateModal(): void {
    if (!this.modalData || !this.modalData.ro.trim() || this.modalTranslating) return;
    this.modalTranslating = true;
    this.requestAutoTranslation(this.modalData.ro)
      .then((translated) => {
        if (this.modalData && translated) {
          this.modalData.en = translated;
        }
      })
      .catch(() => {
        this.statusMessage = 'Traducerea automată a eșuat. Încearcă din nou.';
        this.isError = true;
      })
      .finally(() => {
        this.modalTranslating = false;
      });
  }

  protected autoTranslateKey(key: string): void {
    const roText = this.translations.ro[key];
    if (!roText || !roText.trim() || this.translatingKeys.has(key)) return;
    this.translatingKeys.add(key);
    this.requestAutoTranslation(roText)
      .then((translated) => {
        if (translated) {
          this.translations.en[key] = translated;
        }
      })
      .catch(() => {
        this.statusMessage = 'Traducerea automată a eșuat. Încearcă din nou.';
        this.isError = true;
      })
      .finally(() => {
        this.translatingKeys.delete(key);
      });
  }

  protected isTranslatingKey(key: string): boolean {
    return this.translatingKeys.has(key);
  }

  // --- Translation Dictionary Table View ---
  protected get allTranslationKeys(): string[] {
    const keys = new Set([
      ...Object.keys(this.translations.ro),
      ...Object.keys(this.translations.en),
    ]);
    const filter = this.modalSearchFilter.toLowerCase().trim();
    return Array.from(keys)
      .filter(
        (k) =>
          !filter ||
          k.toLowerCase().includes(filter) ||
          (this.translations.ro[k] && this.translations.ro[k].toLowerCase().includes(filter)) ||
          (this.translations.en[k] && this.translations.en[k].toLowerCase().includes(filter)),
      )
      .sort();
  }

  protected addNewTranslationKey(): void {
    const newKey = prompt('Introdu cheia de traducere (ex: easy_geo_1_custom):');
    if (newKey && newKey.trim()) {
      const cleanKey = newKey.trim();
      this.translations.ro[cleanKey] = '';
      this.translations.en[cleanKey] = '';
      this.openTranslationModal(cleanKey);
    }
  }

  protected deleteTranslationKey(key: string): void {
    if (confirm(`Ștergi cheia "${key}" din ambele limbi?`)) {
      delete this.translations.ro[key];
      delete this.translations.en[key];
    }
  }

  // --- Download Exports ---
  /** File as it is stored in the chapter folder. */
  protected currentChapterFile(): DbChapterFile | null {
    const chapter = this.currentChapter;
    return chapter ? { version: 1, chapter } : null;
  }

  protected downloadDbJson(): void {
    const file = this.currentChapterFile();
    if (!file) {
      return;
    }
    this.triggerDownload(JSON.stringify(file, null, 2), 'db.json', 'application/json');
  }

  protected downloadRoJson(): void {
    const jsonStr = JSON.stringify(this.translations.ro, null, 2);
    this.triggerDownload(jsonStr, 'ro.json', 'application/json');
  }

  protected downloadEnJson(): void {
    const jsonStr = JSON.stringify(this.translations.en, null, 2);
    this.triggerDownload(jsonStr, 'en.json', 'application/json');
  }

  protected downloadMapJson(): void {
    const jsonStr = JSON.stringify(this.chapterMap, null, 2);
    this.triggerDownload(jsonStr, 'map.json', 'application/json');
  }

  protected downloadAllFiles(): void {
    this.downloadDbJson();
    setTimeout(() => this.downloadRoJson(), 200);
    setTimeout(() => this.downloadEnJson(), 400);
    setTimeout(() => this.downloadMapJson(), 600);
  }

  // --- Copy directly to the local gnosy-ui files via gnosy-deepl's /writeassets ---
  protected copyingAll = false;

  protected copyAllToServer(): void {
    if (this.copyingAll) return;
    this.copyingAll = true;
    this.isError = false;
    this.statusMessage = 'Se copiază fișierele...';

    const body = {
      difficulty: this.difficulty.toLowerCase(),
      domain: this.domain.toLowerCase(),
      map: this.chapterMap,
      // One folder per chapter: /db/{difficulty}/{domain}/{chapter}/
      chapters: this.chapterMap.chapters.map((entry) => {
        const bundle = this.bundleOf(entry);
        return {
          chapter: entry.id,
          db: { version: 1, chapter: bundle.chapter } satisfies DbChapterFile,
          ro: bundle.ro,
          en: bundle.en,
        };
      }),
    };

    this.http
      .post<{
        message: string;
        targetDir: string;
        backupDir: string;
      }>(`${environment.translateApiUrl}/writeassets`, body)
      .subscribe({
        next: (res) => {
          this.statusMessage = `Fișierele au fost copiate în ${res.targetDir} (backup în ${res.backupDir}).`;
          this.isError = false;
          this.copyingAll = false;
        },
        error: (err) => {
          this.statusMessage = `Copierea a eșuat: ${err?.error?.message || err.message}`;
          this.isError = true;
          this.copyingAll = false;
        },
      });
  }

  private triggerDownload(content: string, fileName: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  protected goHome(): void {
    this.router.navigate(['/']);
  }
}
