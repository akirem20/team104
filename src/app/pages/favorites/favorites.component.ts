import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';  // Added import for Observable
import { doc, deleteDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  imports:[CommonModule]
})
export class FavoritesComponent implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  userId: string | null = null;
  favoriteFlats: any[] = [];

  ngOnInit(): void {
    // Wait for user authentication state
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;

        this.loadFavorites();  // Load favorites when the user is authenticated
      }
    });
  }

  // Load favorites from Firestore

loadFavorites() {
  if (!this.userId) return;

  const favRef = collection(this.firestore, 'favorites');
  const q = query(favRef, where('userId', '==', this.userId));

  collectionData(q, { idField: 'id' }).subscribe(async (data: any[]) => {
    const enrichedFavorites = await Promise.all(
      data.map(async (fav) => {
        const flatDocRef = doc(this.firestore, 'flats', String(fav.flatId));
        const flatSnap = await getDoc(flatDocRef);
        const flatData = flatSnap.exists() ? flatSnap.data() : {};

        return {
          ...fav,
          ...flatData, // Merge flat data like image, description, etc.
        };
      })
    );

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
