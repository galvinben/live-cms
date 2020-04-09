# Live CMS

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b4c9234-856e-437f-81ce-45028c72eaa5/deploy-status)](https://app.netlify.com/sites/live-cms/deploys)

Live CMS is a template Vue application built to enable quick, live editing of content on a website.

All editable content is stored in a Vuex store called "content". When the user is ready to save the new content to the site, they click the save button. The state is then automatically committed to Github as a JSON file. This then triggers a Netlify build which deploys the site within the next minute, along with the new content.
