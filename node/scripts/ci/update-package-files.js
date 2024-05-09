const fs = require('fs');
const path = require('path');

// Check if it is GitHub Actions environment
if (process.env.CI !== 'true') {
	console.log(
		'The script for updating the list of required files for publishing libraries in the "package.json" file is intended to work only on CI/CD environments.'
	);
	process.exit(0);
}

// Path to the libs directory
const libsPath = path.join(__dirname, '..', '..', '..', 'libs');

// Read contents of the libs directory
fs.readdir(libsPath, { withFileTypes: true }, (err, entries) => {
	if (err) {
		console.error('Error reading the libs directory:', err);
		return;
	}

	// Filter to include only directories
	const folders = entries.filter(entry => entry.isDirectory()).map(dir => `libs/${dir.name}/**/*`);

	// Read the package.json file
	const packageJsonPath = path.join(__dirname, '..', '..', '..', 'package.json');
	fs.readFile(packageJsonPath, 'utf8', (err, data) => {
		if (err) {
			console.error('Error reading package.json file:', err);
			return;
		}

		const packageJson = JSON.parse(data);

		// Update the files field
		packageJson.files = folders;

		delete packageJson.devDependencies;
		delete packageJson.scripts;
		delete packageJson.nx;

		// Write the modified package.json back to the file
		fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8', err => {
			if (err) {
				console.error('Error writing to package.json file:', err);
			} else {
				console.log('package.json file was successfully updated.');
			}
		});
	});
});
