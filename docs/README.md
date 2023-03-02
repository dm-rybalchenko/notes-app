# Note app

Full-stack note taking app. Created by a team of web developer and UI/UX designer.

[Link to deployed application](https://notes-app-umber.vercel.app)

### Technologies

* Client: React, TypeScript, Redux-Toolkit, SCSS-modules, axios

* Server: Node, Express, MongoDB, Mongoose, JWT, Cloudinary, nodeMailer ([Link to the code of the server](https://github.com/dm-rybalchenko/notes-app-server))

### Functionality

* User registration with account verification via email

* Creating, deleting and editing notes individually for each user

* Ability to download (delete, update) and attach to each note a file with an image, incl. via drag-and-drop. Subsequent viewing of the image in the pop-up

* Adding/removing tags for a note in edit mode via `#` while typing

* Tags are highlighted, the list of them are displayed below, you can select and delete them

* Various filters and sorting-modes for notes on the main page, incl. sorting by tags. Search, ability to choose between lazy-loading and pagination

* Notes can be pinned to the top and added to favorites

* Skeleton-loader when loading notes

* Registration and login page with field validation

* For deleting note a dialog-box appearing at the click location

* Pop-up errors and warnings are provided

* Custom 404 page

* Adaptive markup (layout)


## Screenshots

Main-page, delete-dialog
![Screenshot-app-notes](/docs/screenshots/Screenshot-main.jpg)

Note-edit-page, file upload, a tag
![Screenshot-app-notes-edit](/docs/screenshots/Screenshot-edit.jpg)

Sorting and favorites
![Screenshot-app-notes-filter](/docs/screenshots/Screenshot-filters.jpg)

Search and pagination
![Screenshot-app-notes-search](/docs/screenshots/Screenshot-search.jpg)

Login page and field validation
![Screenshot-app-notes-login](/docs/screenshots/Screenshot-login.jpg)

Pop-up with a picture and mobile version (Pinned notes are collapsed)
![Screenshot-mobile-and-popup](/docs/screenshots/Screenshot-mobile-and-popup.jpg)

*PC and mobile versions have been implemented.*

[For developers](https://github.com/dm-rybalchenko/notes-app/tree/develop/docs/for-developers.md)