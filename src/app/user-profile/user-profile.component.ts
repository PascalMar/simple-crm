import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployService } from 'src/app/shared/employ.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  selectedImage: any;
  uid: any;

  userProfileForm !: FormGroup;
  profiledata: any;
  selectedImageURL: any;


  constructor(
    private DataService: DataService,
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private empService: EmployService,
    private snackBar: MatSnackBar) {
    this.userProfileForm = this.fb.group({
      Name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      Country: [''],
    });
  }



  ngOnInit(): void {

    this.getCurrentUserUid();


  }


  async getUserById(uid: string) {
    try {
      this.profiledata = await this.empService.getUserById(uid);
      if (this.profiledata) {
        // Data exists, you can use it here
        console.log('Employee data:', this.profiledata);
        this.userProfileForm.patchValue(this.profiledata);
        this.selectedImageURL = this.profiledata.imageUrl;
      } else {
        // Handle the case where the document does not exist
        console.log('Employee not found');
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error fetching employee data:', error);
    }
  }

  getCurrentUserUid() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.uid = user.uid;
        this.getUserById(this.uid);
        console.log('Current User UID: ', this.uid);

      } else {
        // User is not logged in
        console.log('User is not logged in');
      }
    });
  }


  onFileSelected(event: any) {
    // Get the selected image file
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      // Read the selected image and set the data URL
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedImageURL = event.target.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.selectedImageURL = null; // Clear the image URL if no image is selected
    }
  }

  updateProfile() {
    const filePath = `users_images/${this.selectedImage?.name}`;

    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedImage);
    uploadTask.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((downloadURL) => {
            // Now you have the downloadURL, you can use it
            const profiledata = this.userProfileForm.value;
            profiledata.imageUrl = downloadURL;
            console.log(profiledata);

            if (profiledata !== null) {
              this.empService.updateUserProfile(this.uid, this.userProfileForm.value);
              this.snackBar.open('User profile updated succesfully', 'Close', {
                duration: 3000, // Display the alert for 3 seconds
                panelClass: ['success-snackbar'], // Use custom CSS class for styling (optional)
              });
              this.DataService.updateUserName(profiledata.Name);
              this.DataService.updateUserImageUrl(profiledata.imageUrl);
              // debugger;
            }
          });
        })
      )
      .subscribe();
  }
}
