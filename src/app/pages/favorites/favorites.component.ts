import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, query, where, doc, deleteDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports: [CommonModule]
})
export class FavoritesComponent implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  userId: string | null = null;
  favoriteFlats: any[] = [];

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadFavorites();  // Load favorites when the user is authenticated
      }
    });
  }

  // ✅ Simplified: Load favorite flats using only the favorites collection
  loadFavorites() {
    if (!this.userId) return;

    const favRef = collection(this.firestore, 'favorites');
    const q = query(favRef, where('userId', '==', this.userId));

    collectionData(q, { idField: 'id' }).subscribe((data: any[]) => {
      const enrichedFavorites = data.map((fav) => ({
        ...fav,
        image: fav.imageUrl || ''  // Use imageUrl already stored in the favorite doc
      }));

      console.log('✅ Enriched Flats:', enrichedFavorites);
      this.favoriteFlats = enrichedFavorites;
    });
  }

  removeFromFavorites(flat: any) {
    if (!this.userId) return;

    const favoriteId = `${this.userId}_${flat.flatId}`;
    const favRef = doc(this.firestore, 'favorites', favoriteId);

    deleteDoc(favRef).then(() => {
      alert('Removed from favorites!');
      this.loadFavorites();  // Refresh the list after removal
    }).catch((error) => {
      console.error('Error removing from favorites:', error);
    });
  }
}
