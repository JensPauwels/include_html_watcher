const fs = require('fs');
const gulp = require('gulp');

Array.prototype.forEachAsync = async function(cb){
  for(let x of this){
      await cb(x);
  }
}

const readdirAsync = async function (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, result) => {
			(error) ? reject(error) : resolve(result);
    });
  });
};

const readFileAsync = async function (path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (error, result) => {
			(error) ? reject(error) : resolve(result);
		});
	});
};

const getMatches = (regex, string) => {
  let regexMatch;
  let matches = [];

  while (regexMatch = regex.exec(string)) {
    regexMatch.forEach((match, groupIndex) => {
      matches.push(match);
    });
  };
  return matches;
};



const replace = async origFile => {
  const regex = /<!--.*include:.*-->([\s\S].*?)*?<!--.*\/include.?-->/gm;
  let content = await readFileAsync(`${__dirname}/html/${origFile}`);
  const matches = getMatches(regex, content);
  
  await matches.forEachAsync(async (match, index) => {
    const splitted = match.split('\n');
    let file = getMatches( /'.*'/gm, splitted[0])[0]
    
    if (file !== undefined) {
      file = file.replace(/\'/g, "");
      const firstLine = splitted[0];
      const lastLine = splitted[splitted.length - 1];
      const html = await readFileAsync(`${__dirname}/${file}`);
      content = content.replace(match, `${firstLine}\n${html}\n${lastLine}`);
    };
  });

  fs.writeFile(`${__dirname}/html/${origFile}`,content, 'utf8', (err, res) => {
    if (err) console.log(error);
  });

};



gulp.task('replace', async () => {
  const files = await readdirAsync(`${__dirname}/html`);
  files.forEach(file => replace(file));
});

gulp.task('watch', () => {
  gulp.watch('./partials/*', ['replace']);
});

gulp.task('default', ['watch']);
