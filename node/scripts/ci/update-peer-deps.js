const fs = require('fs');
const path = require('path');
const semver = require('semver');

// Check if it is GitHub Actions environment
if (process.env.CI !== 'true') {
	console.log(
		'The script for updating the list of required "peerDependencies" for publishing libraries in the "package.json" file is intended to work only on CI/CD environments.'
	);
	process.exit(0);
}

// Path to the root package.json file
const rootPackageJsonPath = path.join(__dirname, '..', '..', '..', 'package.json');

// Load the root package.json
let rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));

// Check and initialize the peerDependencies section in the root file
if (!rootPackageJson.peerDependencies) {
	rootPackageJson.peerDependencies = {};
}

// Function to get the lowest version from a range
function getLowerVersion(range) {
	try {
		const version = semver.minVersion(range);
		return version ? version.version : null;
	} catch (error) {
		return null;
	}
}

// Function to merge peerDependencies from library files
function mergePeerDependencies(dependencies) {
	for (const [dependency, newVersion] of Object.entries(dependencies)) {
		const existingVersion = rootPackageJson.peerDependencies[dependency];
		const newLowerVersion = getLowerVersion(newVersion);
		const existingLowerVersion = getLowerVersion(existingVersion);

		if (!existingLowerVersion || (newLowerVersion && semver.gt(newLowerVersion, existingLowerVersion))) {
			rootPackageJson.peerDependencies[dependency] = newVersion;
		}
	}
}

// Search all libraries in the libs folder
const libsPath = path.join(__dirname, '..', '..', '..', 'libs');
const libraries = fs.readdirSync(libsPath);

for (const lib of libraries) {
	const packageJsonPath = path.join(libsPath, lib, 'package.json');

	// Check the existence of a package.json file in the library
	if (fs.existsSync(packageJsonPath)) {
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

		// Merge peerDependencies if present
		if (packageJson.peerDependencies) {
			mergePeerDependencies(packageJson.peerDependencies);
		}
	}
}

// Write changes to the root package.json file
fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));

console.log('Root package.json successfully updated with unique peerDependencies!');
