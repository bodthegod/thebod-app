#thebod blog
**Created by Joe Playdon**
[View Live Website](https://thebod-blog.herokuapp.com/)

## About

"thebod" is a fitness blog website where users can share images and posts about anything gym related, to keep themselves and users motivated and inspired.
Every user that creates an account can have access to view all posts that have been made- and are able to like the posts that they like, and follow the users that they want to see more posts from (these display in the users feed).
This blog is for all fitness lovers, amateur or expert- to share their healthy and friendly advice with other users. 

## Project Goals

The goal of this project was for me to put a twist on a usual blog, add interactive and fun colour schemes and relate it to fitness- a topic I am passionate about. I really wanted this website to engage the user and have a fun and refreshing feel to it.

Required functions that my website needed:
- Good user experience and a clear understanding of the user flow
- User engagement (posting, liking, commenting, following)
- User login authentication status
- Full CRUD functionality for posts, comments, likes, followers and profile data
- Profiles that could be personalised (images, bio)
- Filtering posts by tags
- Filtering posts by search functionality of data related to a post (title, user)
- Like filtering by viewing all previously liked posts
- Feed filtering by viewing all followed user's posts
- Mobile responsiveness for website to be fully functionable and accesable on different screen sizes

## User Stories

#### Navigation 

1. As a user I can view the home page so that I can understand the use and purpose of the blog site
2. As a user I can view the navigation bar at all times so that I have easy access to switch to any page for good user experience
3. As a previous or new user I can view the log in and sign up buttons so that I can log into an account or create an account
 
#### Authentication 

4. As a new or existing user I can create an account so that I can access all login required features to the website
5. As a previous user I can log into my account so that I can access all features for a logged in user
6. As a user I can remain logged in when changing pages so that I can use the app as I please until I log out

#### Posts

7. As a user I can post content on the website so that I can keep my following users up to date on my fitness goals, and upload images
8. As a user I can view the tags related to a post so that I can see how relevant the content is to me as a user
9. As a user I can like or unlike a post so that I can show my opinion on somebody else's content, to give feedback 
10. As a user I can view any other user's specific posts so that I can see all the latest activity on their posts, and see all previous posts they have made
11. As a user I can view the date a post was uploaded on so that I can know how time relevant the post is, and if it is worth viewing

#### Post Detail Page 

12. As a user I can view more information on a specific post so that I can see the entirety of the content related to the post they have made
13. As a user I can view posts that are associated with tags so that I can search for more specific results catered to me
14. As a user I can comment on a post so that I can show my feedback and share my opinion
15. As a user I can see when a comment was posted so that I know if it is a new or old comment
16. As a user I can edit my comments so that I can change any of my comments and the text inside of them
17. As a user I can click the delete comment button so that I can remove any comments I have made if I choose to 
18. As a user I can edit my posts so that I can change the content in my post if I choose to  

#### Main feed page

19. As a user I can view the most recent posts so that I can view the newest and therefor most date relevant content on my feed
20. As a user I can infinitely scroll the website so that I can easily view all posts on the site without interruption
21. As a user I can view the posts that I have previously liked so that I can freely view the content that I like or find informative
22. As a user I can view a list of all relevant posts so that I can see content that has been uploaded by the users I follow
23. As a user I can use the search bar so that I can filter the content I want to see
24.As a user I can view posts that are associated with tags so that I can search for more specific results catered to me

#### Profile Page 

25. As a user I can upload a profile picture so that I can style my profile to make me recognisable
26. As a user I can view other user's profile pictures so that I can identify the user by their image
27. As a user I can update my profile picture so that I can decide to change my picture if I choose to
28. As a user I can update my profile bio so that I can write a little about myself and personalise my own profile
29. As a user I can change my password so that I can keep my profile secure

#### Other Site Users
30. As a user I can view any other user's specific posts so that I can see all the latest activity on their posts, and see all previous posts they have made
31. As a user I can view other profiles so that I can stay up to date on their following, followed and posts
32. As a user I can view a profile picture and a name so that I can check a user's profile page
33. As a user I can view the most popular profiles so that I can see who the most followed users on the site are
34. As a user I can use the follow and unfollow buttons on a user so that I can choose what content I want to see on my feed, and filter the content

#### User Experience

35. As a site owner I want my blog app to be responsive so that my users can view the website on any device they choose with any screen size
36. As a user I can view a no results found error page so that I know the page I am on has no content



## Design Choices

### Colour Scheme

My colour scheme that I decided to use within my app was aimed to be a fun and interactive website to use and look at. The purple background colour (#9247cf) that I chose to use was both abstract and modern but fun to look at- and the goal of my blog was to make sure the journey a user goes through is visually appealing. Firstly, I designed the purple background to work hand in hand with the infinite scrolling functionality due to the fact that the longer the page gets, the background gradients to a lighter colour, keeping the user experience interesting as they scroll further. I kept this purple theme throughout the use of all icons on hover, including the placeholder profile picture a user is assigned on creation of account. The foreground colours are mostly white to allow for a clear depiction of all information displayed to a user when navigating the website (posts, profiles, login/signup pages). Styling this page was one of my favourite parts of creating this project- as it allowed me to explore my creative side.

Furthermore, I kept the toolbar icon colour scheme consistent using a teal colour for the "create post" icon (#51a7a7), a red for the "liked posts"/ "my hearts" icon (#e52828) and finally a dark blue colour (#493fd4) for the "my feed" icon. I wanted these icons to have specific colours for a user to easily identify what they want to do and have an intuitive experience on my site.

<img src="docs/readme/thebod-colourscheme.png">

### Fonts

For my fonts within my website, I used Google Fonts- as my main font, I decided to use Varela Round as it is very easy to look at and fits the fun style of my website. I wanted a font that wasn't too formal nor informal and Varela fit the style. Sans Serif was the fallback font- due to the fact that the website needed consistent styling and sans also fits the style in case fallback is needed.

   

### Wireframes
        
  -   I have used [Balsamiq Wireframes](https://balsamiq.com/) as my desired wireframing tool for my website, as it is very easy to use. However, due to these being wireframes, the final image of the website may be depicted differently yet these are base guidelines of my website, and the image I would like to achieve. I have made wireframes for both mobile and desktop views of the website.

  -   Home Page Desktop Wireframe - [View](/docs/wireframes/thebod-home-page.png)

  -   Home Page Mobile Wireframe - [View](/docs/wireframes/thebod-homepage-mobile.png)
  -   Login Page Desktop Wireframe - [View](/docs/wireframes/thebod-login-page.png)

  -   Login Page Mobile Wireframe - [View](/docs/wireframes/thebod-mobile-login.png)

  -   Signup Page Desktop Wireframe - [View](/docs/wireframes/thebod-signup-desktop.png)
  -   Signup Page Mobile Wireframe - [View](/docs/wireframes/thebod-signup-mobile.png)
  -   Home Feed Page Desktop Wireframe - [View](/docs/wireframes/thebod-blog-home-feed.png)
  -   Home Feed Page Mobile Wireframe - [View](/docs/wireframes/thebod-home-mobile-home-feed.png)
  -   Post Detail Page Desktop Wireframe - [View](/docs/wireframes/thebod-blog-post-detail.png)
  -   Post Detail Page Mobile Wireframe - [View](/docs/wireframes/thebod-home-mobile-post-detail%20.png)
  -   Create Post Page Desktop Wireframe - [View](/docs/wireframes/thebod-blog-create-post.png)
  -   Create Post Page Mobile Wireframe - [View](/docs/wireframes//thebod-mobile-post-create.png)
  -   Profile Detail Page Desktop Wireframe - [View](/docs/wireframes/thebod-blog-profile-detail.png)
  -   Profile Detail Page Mobile Wireframe - [View](/docs/wireframes/thebod-profile-detail-mobile.png)
  -   Profile Edit Page Desktop Wireframe - [View](/docs/wireframes/thebod-blog-edit-profile.png)
  -   Profile Edit Page Mobile Wireframe - [View](/docs/wireframes/thebod-profile-edit-mobile.png)
  -   Profile Password Change Page Mobile Wireframe - [View](/docs/wireframes/thebod-passwordchange-mobile.png)


### Credits

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