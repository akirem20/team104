import { Component, OnInit } from '@angular/core'; 
import { Firestore, collection, addDoc, doc, setDoc, getDocs, query, where, deleteDoc } from '@angular/fire/firestore';
import { getAuth, User } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flats-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FlatsListComponent implements OnInit {
  searchTerm: string = '';
  filteredFlats: any[] = [];
  flats = [
    { id: 1, name: 'Modern Loft', location: 'New York', price: 1200, imageUrl: 'assets/flat1.jpg' },
    { id: 2, name: 'Cozy Studio', location: 'San Francisco', price: 1400, imageUrl: 'assets/flat2.jpg' },
    { id: 3, name: 'Beachside Condo', location: 'Miami', price: 2000, imageUrl: 'assets/flat3.jpg' },
    { id: 4, name: 'Luxury Villa', location: 'Los Angeles', price: 3500, imageUrl: 'assets/flat4.jpg' },
    { id: 5, name: 'City Apartment', location: 'Chicago', price: 1100, imageUrl: 'assets/flat5.jpg' },
    { id: 6, name: 'Mountain Cabin', location: 'Denver', price: 950, imageUrl: 'assets/flat6.jpg' },
    { id: 7, name: 'Countryside House', location: 'Texas', price: 900, imageUrl: 'assets/flat7.jpg' },
    { id: 8, name: 'Elegant Flat', location: 'Boston', price: 1300, imageUrl: 'assets/flat8.jpg' },
    { id: 9, name: 'Downtown Condo', location: 'Seattle', price: 1700, imageUrl: 'assets/flat9.jpg' },
    { id: 10, name: 'Seaside Bungalow', location: 'San Diego', price: 2100, imageUrl: 'assets/flat10.jpg' },
    { id: 11, name: 'Rustic Home', location: 'Nashville', price: 950, imageUrl: 'assets/flat11.jpg' },
    { id: 12, name: 'Skyscraper Apartment', location: 'Philadelphia', price: 1250, imageUrl: 'assets/flat12.jpg' },
    { id: 13, name: 'Garden House', location: 'Portland', price: 1100, imageUrl: 'assets/flat13.jpg' },
    { id: 14, name: 'Coastal Villa', location: 'Charleston', price: 2700, imageUrl: 'assets/flat14.jpg' },
    { id: 15, name: 'Penthouse Suite', location: 'Las Vegas', price: 4500, imageUrl: 'assets/flat15.jpg' },
    { id: 16, name: 'Sunny Apartment', location: 'Phoenix', price: 1150, imageUrl: 'assets/flat16.jpg' },
    { id: 17, name: 'Urban Loft', location: 'Austin', price: 1350, imageUrl: 'assets/flat17.jpg' },
    { id: 18, name: 'Historic House', location: 'Savannah', price: 1400, imageUrl: 'assets/flat18.jpg' },
    { id: 19, name: 'Luxury Cottage', location: 'Orlando', price: 2200, imageUrl: 'assets/flat19.jpg' },
    { id: 20, name: 'Minimalist Apartment', location: 'San Jose', price: 1250, imageUrl: 'assets/flat20.jpg' },
    ];
    

  user: User | null = null;

  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      console.log('User state changed:', this.user);
    });
    this.filteredFlats = [...this.flats];
  }

  filterFlats() {
    const term = this.searchTerm.toLowerCase();
    this.filteredFlats = this.flats.filter((flat) =>
      flat.name.toLowerCase().includes(term) ||
      flat.location.toLowerCase().includes(term) ||
      flat.price.toString().includes(term)
    );
  }

  addNewFlat(newFlat: { name: string; location: string; price: any; imageUrl: string }) {
    const id = this.flats.length + 1;
    const flat = {
      id,
      name: newFlat.name,
      location: newFlat.location,
      price: Number(newFlat.price),
      imageUrl: newFlat.imageUrl
    };
    this.flats.push(flat);
    this.filteredFlats = [...this.flats];
    alert('New flat added successfully!');
  }

  addToFavorites(flat: any) {
    if (this.user) {
      const favoriteId = `${this.user.uid}_${flat.id}`;
      const favoriteRef = doc(this.firestore, 'favorites', favoriteId);

      setDoc(favoriteRef, {
        userId: this.user.uid,
        flatId: flat.id,
        name: flat.name,
        location: flat.location,
        price: flat.price
      }).then(() => {
        alert('Added to favorites!');
      }).catch((error) => {
        console.error('Error adding to favorites:', error);
      });
    } else {
      console.log('User not authenticated');
    }
  }

  selectedFlat: any = null;

  viewDetails(flat: any) {
    this.selectedFlat = flat;
  }
  
  closeModal() {
    this.selectedFlat = null;
  }
  
  async addComment(flat: any) {
    if (!flat.comments) flat.comments = [];

    if (flat.newComment && flat.newComment.trim() !== '') {
      const commentText = flat.newComment.trim();
      flat.comments.push(commentText);

      if (this.user) {
        const commentId = `${this.user.uid}_${flat.id}_${Date.now()}`;
        const commentRef = doc(this.firestore, `flats/${flat.id}/comments/${commentId}`);


        await setDoc(commentRef, {
          userId: this.user.uid,
          flatId: flat.id,
          comment: commentText,
          createdAt: new Date()
        });

        flat.newComment = '';
        console.log('Comment added to Firestore!');
      } else {
        console.log('User not authenticated');
      }
    }
  }

  async removeComment(flat: any, index: number) {
    if (flat.comments && index > -1) {
      const commentToRemove = flat.comments[index];
      flat.comments.splice(index, 1);
  
      if (this.user) {  // Ensure the user is not null
        const userId = this.user.uid; // TypeScript will now understand user is not null here
        const commentRef = collection(this.firestore, `flats/${flat.id}/comments`);

        const querySnapshot = await getDocs(commentRef);
  
        querySnapshot.forEach(async (docSnap) => {
          const data = docSnap.data();
          if (data['comment'] === commentToRemove && data['userId'] === userId && data['flatId'] === flat.id) {
            await deleteDoc(doc(this.firestore, `flats/${flat.id}/comments`, docSnap.id));
            console.log('Comment removed from Firestore!');
          }
        });
      } else {
        console.log('User not authenticated');
      }
    }
  }
  
  async getComments(flat: any) {
    const commentRef = collection(this.firestore, `flats/${flat.id}/comments`);

    const q = query(commentRef, where('flatId', '==', flat.id));

    try {
      const querySnapshot = await getDocs(q);
      flat.comments = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        flat.comments.push(data['comment']);
      });
    } catch (error) {
      console.error('Error retrieving comments:', error);
    }
  }
}
