# Setting up a blog-post

1. navigate to your local repository with the website inside with the cli
2. **git pull** to update your repository to the newest version of the main branch
3. in your file explorer navigate to */transparency-in-cosmos/src/data*. Open *blog.js* with a text editor of your choice.
4. In the file you see an example for a blog-entry illustrating whiche features are currently usable.
    * Name: creates the preview-name of the article showcased on the landing page.
    * Intro: creates a small text on the landing page intented to explain in a short fassion what the post is about.
    * data: in this array the article iteself gets created.
    * header: headline for the article.
    * text: for plaine text. If you want create a paragraph, use a new text-element. A bit complicated. I'll look for a smarter solution.
    * link: 2 arguments. The first is the url. The second the showcased text representing the link
    * image: 3 arguments. first the url of the picture. second explanation in text under the picture. third the intended width of the picture. Sadly at the moment in px. I intend to change this to a percentage-value in the future.

If you need more features reach out or add the data in a comment. For example:
*/* {video: link: some url, text: some text} */ //I need a possibility to integrate videos!*
5. The basic requirement for a new entry is a name and a an empty array like this:
{
    name: < name of the blog-entry >,
    data: []
}
This will create a new preview on the landing page and a an empty article.
6. You can monitor your progress by using **npm start** in the cli.
7. If you are satisfied with your result you can create a new branch with git. **git checkout -b 'blog < name of your blog-entry >'** (Don't forget to stop the app in your terminal first by clicking *control + c*)
8. Add your changes to the staging area with **git add src/data/blog.js**. 
8. Now are able to commit your changes using **git commit -m 'blog < name >'
9. Before you push this to github. Make sure you didn't miss any updates on the main-branch by checking the discord-bot und using **git pull** again. 
10. You can push your branch now on github with **git push --set-upstream origin < name of the branch >**.
11. In the github-repository you can now see your branch. You are able to create a pull request to merge your changes on the main branch.

# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
