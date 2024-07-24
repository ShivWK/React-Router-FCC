# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Project Content issues

## 1: Handling "Page Not Found" on Refresh with React Router and Netlify

### Problem:
When deploying a React application using React Router to Netlify, refreshing any page other than the home page results in a "Page Not Found" error. This happens because the server tries to find the file at the specified path, which doesn’t exist, and returns a 404 error.

### Solution:
To fix this, configure Netlify to always serve the `index.html` file for all routes. This allows React Router to handle the routing on the client side.

### Steps to Fix:

1. **Create a `_redirects` File:**
   - Navigate to the `public` directory of your React project.
   - Create a new file named `_redirects`.
   
     ```plaintext
     public/_redirects
     ```

2. **Edit the `_redirects` File:**
   - Open the `_redirects` file in a text editor.
   - Add the following content:
     
     ```plaintext
     /*    /index.html   200
     ```

3. **Build and Deploy Your Project:**
   - Build your project using your preferred method. For example:
     
     ```bash
     npm run build
     ```
   - Ensure the `_redirects` file is included in the output directory (`build` or `dist`).
   - Deploy the contents of the build directory to Netlify.

### Example:

**1. Creating the `_redirects` File:**
   - Path: `public/_redirects`
   - Content:
     
     ```plaintext
     /*
     /index.html   200
     ```

**2. Building and Deploying:**
   - Build the project:
     
     ```bash
     npm run build
     ```
   - Verify the `_redirects` file is in the `build` directory.
   - Deploy the `build` directory to Netlify.

### Result:
After following these steps, Netlify will always serve the `index.html` file for any route, allowing React Router to handle the routing on the client side. This ensures that your React application will not show a "Page Not Found" error on refresh or direct URL access.

### Additional Resources:

- [Netlify Redirects Documentation](https://docs.netlify.com/routing/redirects/)
- [React Router Documentation](https://reactrouter.com/web/guides/quick-start)

By setting up the _redirects file, you ensure that all paths are redirected to index.html, solving the issue of "Page Not Found" errors on page refresh in your React application deployed on Netlify.
