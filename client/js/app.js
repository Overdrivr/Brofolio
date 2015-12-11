var app = angular.module("brofolioApp",[]);

app.controller("GalleryController",function(){
  this.assets = assets;
});

var assets = [
  {
    title: "Project 1",
    description: "Bla bla, blablabla.",
    image: "/test/sample-1.jpg"
  },
  {
    title: "Project 2",
    description: "Blo blo, blobloblo.",
    image: "/test/sample-1.jpg"
  },
  {
    title: "Project 3",
    description: "Bla bla, blablabla.",
    image: "/test/sample-1.jpg"
  },
  {
    title: "Project 4",
    description: "Blo blo, blobloblo.",
    image: "/test/sample-1.jpg"
  },
  {
    title: "Project 5",
    description: "Bla bla, blablabla.",
    image: "/test/sample-1.jpg"
  },
  {
    title: "Project 6",
    description: "Blo blo, blobloblo.",
    image: "/test/sample-1.jpg"
  },
];
