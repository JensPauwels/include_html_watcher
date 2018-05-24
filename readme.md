#step1: yarn install

#step2: gulp

This script will allow you to include html chunks in other files, this allows us to write maintaible html code.

This script will look at the partials folder, whenever there's a change in one of the html it will activate the script which searches all of the include tags and replace them with the correct html of the partial file. The benefit of this script is that it happens whilst developing. This doesn't require any js calls for the endusers. Due to this our first meaningfull painting will be faster

code example

```
 <!-- include: '/partials/footer.html'-->
 <!-- /include -->
```

imagine that our footer.html contains 
```
<Footer>
  <p></p>
</Footer>
```
then our original html will be

```
 <!-- include: '/partials/footer.html'-->
  <Footer>
    <p></p>
  </Footer>
 <!-- /include -->
```
![Alt Text]( https://media.giphy.com/media/dJQF5mm4vhLi2knmva/giphy.gif)
