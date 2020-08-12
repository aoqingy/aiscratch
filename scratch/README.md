要编译scratch-desktop

ln -s scratch-gui-desktop scratch-gui

cd scratch-desktop
npm install @tensorflow/tfjs@1.5.2
npm install @tensorflow/tfjs-core@1.5.2
npm install @tensorflow-models/knn-classifier@1.2.2
npm install @tensorflow-models/coco-ssd@2.1.0
npm install @tensorflow-models/mobilenet@2.0.4
npm install @tensorflow-models/posenet@2.2.1
npm install @tensorflow-models/speech-commands@0.4.2

npm install babel-polyfill
npm install sweetalert
npm install tesseract.js@2.1.1
npm install tesseract.js-core@2.2.0
npm install face-api.js@0.22.1
npm install handtrackjs@0.0.13
cp ../handtrackjs_src_index.js ./node_modules/handtrackjs/src/index.js

npm install rimraf
npm install mkdirp
npm install electron
npm install electron-builder
npm install electron-webpack
cp ../electron-webpack.cmd ./node_modules/.bin/electron-webpack.cmd
or
"%_prog%" "%dp0%\..\electron-webpack\out\cli.js" %*
"%_prog%" --max_old_space_size=10240 "%dp0%\..\electron-webpack\out\cli.js" %*

cd ../scratch-vm
npm link
cd ../scratch-gui
npm link scratch-vm
#npm run build
npm link
cd ../scratch-desktop
npm link scratch-gui
npm run dist


要编译Scratch GUI
ln -s scratch-gui-website scratch-gui
ln -s scratch-vm-website scratch-vm

cd scratch-gui
npm install @tensorflow/tfjs@1.5.2
npm install @tensorflow/tfjs-core@1.5.2
npm install @tensorflow-models/knn-classifier@1.2.2
npm install @tensorflow-models/coco-ssd@2.1.0
npm install @tensorflow-models/mobilenet@2.0.4
npm install @tensorflow-models/posenet@2.2.1
npm install @tensorflow-models/speech-commands@0.4.2

npm install babel-polyfill
npm install sweetalert
npm install tesseract.js@2.1.1
npm install tesseract.js-core@2.2.0
npm install face-api.js@0.22.1
npm install handtrackjs@0.0.13
cp ../handtrackjs_src_index.js ./node_modules/handtrackjs/src/index.js

cd ../scratch-vm
npm link
cd ../scratch-gui
npm link scratch-vm
npm run build
