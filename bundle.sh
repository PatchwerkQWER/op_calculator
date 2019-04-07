mkdir -p .bundle/

cd .bundle
cp -a ../controllers/ controllers
cp -a ../definitions/ definitions
cp -a ../public/ public
cp -a ../views/ views

tpm create app.package
cp app.package ../app.bundle

cd ..
rm -rf .bundle
echo "DONE"