# Updating Portfolio Content

Almost all visible portfolio content lives in `src/portfolioData.js`.

- Update your name, introduction, photo, CV, and location in `person`.
- Add or reorder navigation sections in `navigation`.
- Add projects by copying an object in `projects`.
- Add skills, jobs, achievements, and certifications to their matching arrays.
- Set `companyIcon` on an experience item to short initials such as `"TE"`, or a public image path such as `"/TE.jpeg"`.
- Update contact and social links in `socialLinks` and `contact`.
- Put local images and the CV in `public/`, then use paths such as `/project-camera.jpg`.

`src/App.jsx` contains the layout, styling, animations, and interactions. You normally
do not need to edit it when changing portfolio content.


# Run project
```
npm install -g vercel
vercel login
vercel --prod
```
