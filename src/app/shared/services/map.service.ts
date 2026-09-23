import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';

/** Externalized map entry: texts are global i18n keys, image is a path under the app root. */
export interface MapChapterEntry {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  image?: string;
  locked?: boolean;
  /** Activity the chapter starts at; an entry without one is not playable yet. */
  startActivityId?: string;
}

export interface MapDefinition {
  version: number;
  chapters: MapChapterEntry[];
}

export interface MapChapter extends Omit<MapChapterEntry, 'icon' | 'image' | 'startActivityId'> {
  order: number;
  icon: string;
  image: string | null;
  locked: boolean;
  startActivityId: string | null;
}

@Injectable({ providedIn: 'root' })
export class MapService {
  private readonly http = inject(HttpClient);

  private chapters$?: Observable<MapChapter[]>;

  /** Loads the chapter map from /map.json. Texts stay as keys so they follow the active language. */
  loadChapters(): Observable<MapChapter[]> {
    this.chapters$ ??= this.http.get<MapDefinition>('/map.json').pipe(
      map((definition) =>
        definition.chapters.map((entry, index) => ({
          ...entry,
          order: index + 1,
          icon: entry.icon ?? '📘',
          image: entry.image ? toAbsolutePath(entry.image) : null,
          locked: entry.locked ?? !entry.startActivityId,
          startActivityId: entry.startActivityId ?? null,
        })),
      ),
      catchError((err) => {
        console.error('[Map] Failed to load /map.json:', err);
        return of([] as MapChapter[]);
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    return this.chapters$;
  }
}

function toAbsolutePath(image: string): string {
  return image.startsWith('/') || image.startsWith('http') ? image : `/${image}`;
}
