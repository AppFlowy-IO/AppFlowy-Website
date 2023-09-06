# Project README

## Introduction

This README provides an overview of our frontend project, covering its development, deployment, and testing processes.

## Development

### Configuration Flexibility
Our frontend project offers extensive configurability. You can customize various aspects, including images, links, and text content. All these configurations are managed through JSON files located in the `src/data` directory. Each webpage has its dedicated JSON file, organized by page routes, for instance, `/about-us` page configuration is stored in `src/data/about-us.json`.

### Internationalization (i18n) Support
We are planning to introduce i18n support in the future. When configuring content in the JSON files, please use i18n keys to facilitate seamless translation.

### Language Support
As of now, our project primarily supports the English language due to some compatibility issues with the latest version of Next.js. Full support for languages other than English is currently under development. Translation files can be found in the `locale` folder.

### Day and Night Mode
Our website features a day and night mode toggle, achieved through CSS variables for switching token colors.

## Deployment

### Automatic Testing Environment Deployment
We have set up an automated deployment process for the testing environment. When code is merged into either the `main` or `develop` branch, the system automatically deploys the changes to the testing environment. You can find the deployment workflow configuration in `.github/workflows/deploy_dev.yml`.

### Manual Production Environment Deployment
To deploy changes to the production environment, follow these steps:
1. Visit the project's GitHub page.
2. Navigate to the "Actions" tab.
3. Click on "Manual Deploy to Production."
4. Select "Run workflow" to initiate a manual deployment to the production environment.

## Testing

Our testing framework of choice is Cypress. Comprehensive testing information will be provided in this section as the project progresses.

Feel free to update this README with more details as the project evolves. If you have any questions or need further assistance, please don't hesitate to reach out. Happy coding!
