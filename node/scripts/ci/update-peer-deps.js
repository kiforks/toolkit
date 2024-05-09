const fs = require('fs');
const path = require('path');

// Check if it is GitHub Actions environment
if (process.env.CI !== 'true') {
	console.log(
		'The script for updating the list of required "peerDependencies" for publishing libraries in the "package.json" file is intended to work only on CI/CD environments.'
	);
	process.exit(0);
}

// Function for reading and processing peerDependencies from package.json file
function readPeerDependencies(packageJsonPath) {
	try {
		const packageJson = require(packageJsonPath);
		return packageJson.peerDependencies || {};
	} catch (error) {
		console.error(`Error reading ${packageJsonPath}:`, error);
		return {};
	}
}

// Function for merging peerDependencies from different libraries
function mergePeerDependencies(existingDeps, newDeps) {
	for (const [dep, version] of Object.entries(newDeps)) {
		if (!Object.prototype.hasOwnProperty.call(existingDeps, dep)) {
			existingDeps[dep] = version;
		}
	}
}

// Function for recursively searching for the package.json file in a directory and its subdirectories
function findPackageJson(dir) {
	const files = fs.readdirSync(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);

		if (file === 'package.json') {
			return filePath;
		}
	}
	return null;
}

// Main function for processing the libs folder and its subfolders
function processLibsFolder(libsDir, rootPackageJsonPath) {
	const rootPeerDependencies = readPeerDependencies(rootPackageJsonPath);

	const libs = fs.readdirSync(libsDir);
	for (const lib of libs) {
		const libPath = path.join(libsDir, lib);
		const packageJsonPath = findPackageJson(libPath);
		if (packageJsonPath) {
			const peerDependencies = readPeerDependencies(packageJsonPath);
			mergePeerDependencies(rootPeerDependencies, peerDependencies);
		} else {
			console.warn(`package.json not found in ${libPath}`);
		}
	}

	// Saving changes to the root package.json
	const rootPackageJson = require(rootPackageJsonPath);
	rootPackageJson.peerDependencies = rootPeerDependencies;
	fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));
}

// Call the main function to process the libs folder and its subfolders
const libsDir = path.join(__dirname, '..', '..', '..', 'libs');
const rootPackageJsonPath = path.join(__dirname, '..', '..', '..', 'package.json');
processLibsFolder(libsDir, rootPackageJsonPath);
