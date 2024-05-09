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

// Шлях до кореневого package.json файлу
const rootPackageJsonPath = path.join(__dirname, '..', '..', '..', 'package.json');

// Завантаження кореневого package.json
let rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));

// Перевірка та ініціалізація секції peerDependencies у кореневому файлі
if (!rootPackageJson.peerDependencies) {
	rootPackageJson.peerDependencies = {};
}

// Функція для отримання найнижчої версії з діапазону
function getLowerVersion(range) {
	try {
		const version = semver.minVersion(range);
		return version ? version.version : null;
	} catch (error) {
		return null;
	}
}

// Функція для об'єднання peerDependencies з бібліотечних файлів
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

// Пошук усіх бібліотек у папці libs
const libsPath = path.join(__dirname, '..', '..', '..', 'libs');
const libraries = fs.readdirSync(libsPath);

for (const lib of libraries) {
	const packageJsonPath = path.join(libsPath, lib, 'package.json');

	// Перевірка існування файлу package.json у бібліотеці
	if (fs.existsSync(packageJsonPath)) {
		const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

		// Об'єднання peerDependencies, якщо вони присутні
		if (packageJson.peerDependencies) {
			mergePeerDependencies(packageJson.peerDependencies);
		}
	}
}

// Запис змін до кореневого файлу package.json
fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));

console.log('Кореневий package.json успішно оновлено з унікальними peerDependencies!');
