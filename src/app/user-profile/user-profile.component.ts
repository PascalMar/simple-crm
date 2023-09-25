import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployService } from 'src/app/shared/employ.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
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


  constructor(private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private empService: EmployService) {
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
        this.selectedImage = this.profiledata.imageUrl;
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
  }

  updateProfile() {
    const filePath = `users_images/${this.selectedImage.name}`;

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
            }
          });
        })
      )
      .subscribe();
  }

}
