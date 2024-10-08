---
title: Welcome to Raccoon
heroImage: raccoon.png
tagline: A lightweight, flexible mini-PACS, easy to used in research level or production.
actions:
  - label: View on github
    type: primary
    to: "https://github.com/Chinlinlee/raccoon-dicom"
    external: true
features:
  - title: SQL ORM based
    description: Use sequelize, a powerful ORM for Node.js.
    icon: 
      type: iconify
      collection: vscode-icons
      name: file-type-sequelize
  - title: Build with Docker
    description: To help to quickly setup your raccoon mini-PACS.
    icon:
      type: iconify
      collection: vscode-icons
      name: file-type-docker2
  - title: Write in Node.js
    description: Use Node.js to write scripts and build your modified raccoon mini-PACS.
    icon:
      type: iconify
      collection: vscode-icons
      name: file-type-node
---


<script>
    import { base } from "$app/paths";
    import { onMount } from "svelte";

    let heroImage = `${base}/raccoon.png`;
    let github = "https://github.com/Chinlinlee/raccoon-dicom";

    onMount(() => {
        let heroImageEl = document.querySelector(".hero-image > img:nth-child(1)");
        heroImageEl.setAttribute("src", heroImage);

        let viewOnGithub = document.querySelector(".actions > a");
        viewOnGithub.setAttribute("href", github);
    });
</script>