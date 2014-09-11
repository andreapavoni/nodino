gulp = require("gulp")
coffee = require("gulp-coffee")
gutil = require("gulp-util")
clean = require("gulp-rimraf")
react = require("gulp-react")
stylus = require("gulp-stylus")
concat = require("gulp-concat")
uglify = require("gulp-uglify")
minifyCSS = require("gulp-minify-css")
rename = require("gulp-rename")
size = require("gulp-size")
mocha = require("gulp-mocha")
istanbul = require("gulp-istanbul")
cjsx = require("gulp-cjsx")
bowerFiles = require('main-bower-files')

gulp.task "clean", ->
  gulp.src("public/*", read: false).pipe clean()

gulp.task "css", ["clean"], ->
  gulp.src("./assets/stylesheets/application.styl")
    .pipe(stylus())
    .pipe(gulp.dest("./public/stylesheets"))
    .pipe(size())
    .pipe(minifyCSS(
      keepSpecialComments: 0
      processImport: true
    ))
    .pipe(rename("application.min.css"))
    .pipe(gulp.dest("./public/stylesheets"))
    .pipe(size())
    .on("error", gutil.log)

gulp.task "js:compile", ["clean"], ->
  # vendors
  gulp.src(bowerFiles({ bowerrc: './.bowerrc' }))
    .pipe(concat("vendor.js"))
    .pipe(gulp.dest("./tmp/assets"))
    .on("error", gutil.log)

  # app
  gulp.src([
    "assets/javascripts/*.coffee"
  ])
    .pipe(cjsx())
    .pipe(react())
    .pipe(concat("app.js"))
    .pipe(gulp.dest("./tmp/assets"))


gulp.task "js", ["js:compile"], ->
  gulp
    .src(["./tmp/assets/vendor.js", "./tmp/assets/app.js"])
    .pipe(concat("app.js"))
    .pipe(rename("application.js"))
    .pipe(gulp.dest("./public/javascripts"))
    .pipe(size
      showFiles: true
      title: "Non minified JS"
    )
    .on("error", gutil.log)
    .pipe(uglify())
    .pipe(rename("application.min.js"))
    .pipe(gulp.dest("./public/javascripts"))
    .pipe(size
      showFiles: true
      title: "Minified JS"
    )
    .on("error", gutil.log)

gulp.task "test", ->
  gulp.src([
    "controllers/**/*.coffee"
    "middlewares/**/*.coffee"
    "models/**/*.coffee"
    "app.coffee"
  ])
    .pipe(coffee())
    .pipe(istanbul())
    .on("end", ->
      gulp.src(["test/**/*.coffee"])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
    )

gulp.task "assets", [
  "clean"
  "js"
  "css"
]
gulp.task "default", ["test"]
