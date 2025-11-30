
# Obsidian Nightfall v2025/2026
#### A Developer's GitHub Page Theme

**Obsidian Nightfall** is a custom Jekyll theme designed specifically for developers who want to showcase their GitHub repositories on a personalized website automatically. This theme can be used as your main GitHub Page (`username.github.io`) or within any sub-repository. It provides a sleek, modern, and dark-themed interface with a focus on readability and usability. [Demo](https://volkansah.github.io/)

## Key Features

- **Automatic GitHub Repository Display**: The theme dynamically fetches and displays your GitHub repositories.
- **Modal Pop-ups for Repository Details**: View repository details, including README files, within modal pop-ups, ensuring a seamless browsing experience.
- **Responsive and Dark-Themed Design**: A Bootstrap-based dark theme that looks great on all devices.
- **Automated Deployment with GitHub Actions**: Automatically build and deploy your site using GitHub Actions.

## Getting Started

### Step 1: Fork the Repository

1. **Fork this repository**: Click the "Fork" button at the top right of this repository page to create a copy under your own GitHub account.

2. **Rename the Repository**: After forking, rename the repository to `username.github.io` if you want to use it as your main GitHub Page, or to any other name if you want to use it as a project page.

### Step 2: Update Configuration on GitHub

1. **_config.yml**: Open the `_config.yml` file directly on GitHub and update the following fields:
   - `title`: Set this to the title of your website.
   - `description`: A short description of your site.
   - `url`: Set this to `https://your-username.github.io` if it's your main GitHub Page, or `https://your-username.github.io/repo-name` if it's a sub-repo.
   - `baseurl`: Leave this empty for the main page or set it to `/repo-name` for a sub-repo.

2. **index.md**: Customize the `index.md` to personalize your landing page. The page automatically lists your repositories.
3. **Exclude Repos**:
   - If there are repositories you don’t want to display, you can exclude them by modifying the filtering function in the `index.md` file. 
   - Open `index.md` and locate the following section:
   
   ```javascript
   let filteredData = data.filter(repo => {
       return !repo.fork && 
              repo.name !== 'repo-name-to-exclude';
   });
   ```

### Step 3: Personalize Your Site

1. **Replace the Logo**: Upload your logo to the `assets/img/` directory directly on GitHub and update the logo path in `_layouts/default.html`.
2. **Modify Content**: Edit `index.md` and other content files to fit your personal style and information.
3. **Exclude Repos**: If there are repositories you don’t want to display, list them in the filtering function in `index.md`.

### Step 4: Set Up GitHub Actions for Automatic Deployment

1. **Set Up Secrets**:
   - Go to your repository settings on GitHub.
   - Navigate to "Secrets and variables" > "Actions".
   - Click on "New repository secret".
   - Name it `GH_TOKEN` and paste your [GitHub Personal Access Token (PAT)](https://github.com/settings/tokens).
   - Save the secret.

2. **GitHub Actions Workflow**:
   - The workflow file located in `.github/workflows/` is already set up to automatically build and deploy your site whenever you push changes to the `main` branch.
   - **Tip:** Rename the `.github/workflows/deploy.yml` file to `.github/workflows/deploy.yml.example` to prevent the actions from running during setup. Once your setup is complete, rename `deploy.yml.example` back to `deploy.yml` to enable the deployment process.


### Step 5: Deploy Your Site

1. **Commit Changes on GitHub**:
   - After making all the changes directly on GitHub, commit them.

2. **View Your Site**:
   - Go to `https://your-username.github.io` (or `https://your-username.github.io/repo-name` for sub-repos) to see your live site.

### Support My Work

If you find this project useful, please consider giving it a :star: on GitHub. Your support helps me continue creating free, high-quality resources like this.

Creating and maintaining this theme takes a significant amount of time and effort. If you'd like to support my work further, feel free to follow me on GitHub or consider becoming a sponsor. You can also buy me a coffee to keep me fueled for future updates!

## Troubleshooting and Future Improvements

### Known Issues
nothing
Fixed! 30.12.2024 happy new year 😃 

### How to Report Issues

If you encounter any issues or bugs while using this theme, please feel free to open an issue in the GitHub repository. Contributions and suggestions for improvement are always welcome!

## Contribution

Feel free to contribute by submitting a pull request or opening an issue. Contributions that enhance functionality or improve the design are always welcome!

## License

This theme is available under the [MIT License](LICENSE). Dedicated with love to my son!

## Acknowledgements

- **Jekyll**: Static site generator used for this theme.
- **Bootstrap**: Front-end framework used for styling and layout.
- **Font Awesome**: For icons.
- **GitHub Actions**: For continuous deployment.
- **Masonry.js**: For dynamic layout of repositories.

### Copyright 
**S. Volkan Kücükbudak**
