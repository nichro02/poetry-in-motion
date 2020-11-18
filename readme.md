# APP DESCRIPTION
Poetry in motion is designed to get the creative juices flowing for people on the go. A random picture is generated with each new post, and this can serve as your inspiration to write a few words or a few sentences, or simply be something that is nice to look at while you're taking notes.

You can access Poetry in Motion (put link here).

# TECHNOLOGY
* Node.js
* Express
* EJS
* Sequelize
* Unsplash API

# PROCESS

## PLANNING
I drafted an [ERD](https://lucid.app/invitations/accept/d7c024b2-cd71-4133-8911-fe77740f03fa) and [wireframe](https://lucid.app/invitations/accept/6d4e680a-a358-4995-94b2-7752a3042411) before writing any code in order to make sure I had a clear understanding of what models I needed to include in my app, how they related to each other, and what I wanted my app to ultimately look like. As part of planning, I also needed to find an API that would allow me to fetch a random picture to serve as inspiration for each post. I knew Unsplash had the types of photos I was looking for, and it turns out they have an API for developers. The JSON objects returned by the API call looked navigable so I settled on Unsplash's API.

## STRUCTURE AND PSEUDOCODE
Once I had a clear vision of what I wanted the app to be and how I wanted it to work, I focused on setting up the structure of the app and writing pseudocode that would help guide the actual writing of the code. It gave me the chance to really make sure I understood the direction I wanted to take, and how I was going to make my app RESTful.

Building out the structure of the app also required incorporating authorization (through bcrypt, oAuth, express sessions, and passport) and my ORM (Sequelize). I was able to leverage an auth boilerplate I had previously set up, and my ERD was useful in helping me set up the models I use in the app.

Linking the API to my app was another integral piece in the structure of the app. Unsplash has plenty of documentation to help developers once they're signed up, and after some help getting an access key, I was able get the API up and running.

Finally, I set up my EJS layout page, which served as a template for the other EJS pages I created.

## APP DEVELOPMENT
Pseudocode helped greatly when I actually began writing code. I had already made note of the routes I needed, so I was able to focus on executing and troubleshooting rather than planning on the fly. I prefer to write code incrementally and test it often so putting in the work upfront to plan out my app was huge.

## CHALLENGES
I underestimated the amount of time I would spend on the photographer attribution aspect of each post. I wanted to make sure that the photographers whose photos were retrieved by the API call received attribution. After debating between storing the photographer's name as part of the post model and making an API call, I decided on the former, due to timing constraints and concerns about hitting the limit of hourly API calls, I decided to include the photographer name in the database.

I also wanted to challenge myself on the design front because I felt like it was a good opportunity to hone my design skills. I identified two areas of focus that I thought would improve the user-friendliness of my app: a fixed header and responsive design. My biggest challenge on the design front was accounting for the different breakpoints and altering the necessary elements on the page to make a cohesive experience for every device. I was pleased for my first attempt at a responsive design, but this is definitely an area I can improve upon in future iterations.

# CONCLUSION
For my first full-stack app, I'm proud of the initial product. I incorporated the knowledge I had gained, identified ares that required further research, and got a fair amount of practice troubleshooting. Poetry in Motion is an app that I can continue to scale and add functionality to. Hopefully you enjoy it!