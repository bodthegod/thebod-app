https://imagecolorpicker.com/en used colour grabber for favicon colours and logo

https://formito.com/tools/favicon used this software to create favicon
https://www.adobe.com/express/create/logo this software to create logo
https://www.flaticon.com/free-icon/upload_8045653?term=upload&page=1&position=91&origin=tag&related_id=8045653 For icon upload image
https://www.flaticon.com/free-icon/arrow_9283463?term=upload&page=5&position=40&origin=tag&related_id=9283463
https://www.davidhu.io/react-spinners/ for spinners
https://unused-css.com/blog/css-shake-animation/ shake animation
https://cdn.dribbble.com/users/1242216/screenshots/9326781/media/https://dribbble.com/shots/9326781-No-Results-Found-Illustration no results found search image
https://getcssscan.com/css-box-shadow-examples for box shadow
https://bgjar.com/wave-line for background wave line

Bug fix: I had a bug where the navbar profile picture would show, however for an unknown reason the profile pictures that were not specified by the UseCurrentUser() method would not display when tied to the post list and detail views. To fix this, there was lots of trial and error- however I finally discovered that it was down to a very minute detail within the PostSerializer.py file within my API. `profile_image = serializers.ReadOnlyField(source='owner.profile.image.id')`. After understanding this issue, I had realised the final .id should have been .url- and this fixed the bug once I had committed my changes to my API and pushed them to the deployed project.