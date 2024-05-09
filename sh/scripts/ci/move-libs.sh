ls -la dist/libs/

echo "Listing content of dist/libs/"
ls dist/libs/

echo "Moving content from dist/libs/ to project root"
shopt -s dotglob # Includes hidden files in the move
mv dist/libs/* ./

echo "Content of project root after move:"
ls -la
