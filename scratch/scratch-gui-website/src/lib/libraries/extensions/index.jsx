import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';


import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitInsetIconURL from './microbit/microbit-small.svg';
import microbitConnectionIconURL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';

import ev3IconURL from './ev3/ev3.png';
import ev3InsetIconURL from './ev3/ev3-small.svg';
import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
import wedo2InsetIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

import boostIconURL from './boost/boost.png';
import boostInsetIconURL from './boost/boost-small.svg';
import boostConnectionIconURL from './boost/boost-illustration.svg';
import boostConnectionSmallIconURL from './boost/boost-small.svg';
import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

import gdxforIconURL from './gdxfor/gdxfor.png';
import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

/*
** Machine Learning
*/
import mlcanvasIconURL from './mlcanvas/mlcanvas.png';
import mlcanvasInsetIconURL from './mlcanvas/mlcanvas-small.png';

import mlcostumeIconURL from './mlcostume/mlcostume.png';
import mlcostumeInsetIconURL from './mlcostume/mlcostume-small.png';

import mldigitsIconURL from './mldigits/mldigits.png';
import mldigitsInsetIconURL from './mldigits/mldigits-small.png';

import mlguessIconURL from './mlguess/mlguess.png';
import mlguessInsetIconURL from './mlguess/mlguess-small.png';

import mlimageIconURL from './mlimage/mlimage.png';
import mlimageInsetIconURL from './mlimage/mlimage-small.png';

import mlocrIconURL from './mlocr/mlocr.png';
import mlocrInsetIconURL from './mlocr/mlocr-small.png';

import mlfaceIconURL from './mlface/mlface.png';
import mlfaceInsetIconURL from './mlface/mlface-small.png';

import mlhandIconURL from './mlhand/mlhand.png';
import mlhandInsetIconURL from './mlhand/mlhand-small.png';

import mlposeIconURL from './mlpose/mlpose.png';
import mlposeInsetIconURL from './mlpose/mlpose-small.png';

import mlobjectIconURL from './mlobject/mlobject.png';
import mlobjectInsetIconURL from './mlobject/mlobject-small.png';

import mlirisIconURL from './mliris/mliris.png';
import mlirisInsetIconURL from './mliris/mliris-small.png';

import mltextIconURL from './mltext/mltext.png';
import mltextInsetIconURL from './mltext/mltext-small.png';

import mlspeechIconURL from './mlspeech/mlspeech.png';
import mlspeechInsetIconURL from './mlspeech/mlspeech-small.png';

import mlaudioIconURL from './mlaudio/mlaudio.png';
import mlaudioInsetIconURL from './mlaudio/mlaudio-small.png';

import mlchatIconURL from './mlchat/mlchat.png';
import mlchatInsetIconURL from './mlchat/mlchat-small.png';

//import qrcodeIconURL from './mlchat/mlchat.png';
//import qrcodeInsetIconURL from './mlchat/mlchat-small.png';

/*
** Robot Hardware
*/
import mlcarIconURL from './mlcar/mlcar.png';
import mlcarInsetIconURL from './mlcar/mlcar-small.png';

import arduinoIconURL from './arduino/arduino.png';
import arduinoInsetIconURL from './arduino/arduino-small.svg';
import arduinoConnectionIconURL from './arduino/arduino-small.svg';
import arduinoConnectionSmallIconURL from './arduino/arduino-small.svg';

import mlsensorIconURL from './mlsensor/mlsensor.png';
import mlsensorInsetIconURL from './mlsensor/mlsensor-small.svg';
import mlsensorConnectionIconURL from './mlsensor/mlsensor-small.svg';
import mlsensorConnectionSmallIconURL from './mlsensor/mlsensor-small.svg';

import litebeeIconURL from './litebee/litebee.png';
import litebeeInsetIconURL from './litebee/litebee-small.svg';
import litebeeConnectionIconURL from './litebee/litebee-small.svg';
import litebeeConnectionSmallIconURL from './litebee/litebee-small.svg';

import telloIconURL from './tello/tello.png';
import telloInsetIconURL from './tello/tello-small.svg';
import telloConnectionIconURL from './tello/tello-small.svg';
import telloConnectionSmallIconURL from './tello/tello-small.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: 'translate',
        collaborator: 'Google',
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Makey Makey',
        extensionId: 'makeymakey',
        collaborator: 'JoyLabz',
        iconURL: makeymakeyIconURL,
        insetIconURL: makeymakeyInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        featured: true
    },
    {
        name: 'micro:bit',
        extensionId: 'microbit',
        collaborator: 'micro:bit',
        iconURL: microbitIconURL,
        insetIconURL: microbitInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world."
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: microbitConnectionIconURL,
        connectionSmallIconURL: microbitConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/microbit'
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        collaborator: 'LEGO',
        iconURL: ev3IconURL,
        insetIconURL: ev3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: ev3ConnectionIconURL,
        connectionSmallIconURL: ev3ConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
                description="Message to help people connect to their EV3. Must note the PIN should be 1234."
                id="gui.extension.ev3.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/ev3'
    },
    {
        name: 'LEGO BOOST',
        extensionId: 'boost',
        collaborator: 'LEGO',
        iconURL: boostIconURL,
        insetIconURL: boostInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Bring robotic creations to life."
                description="Description for the 'LEGO BOOST' extension"
                id="gui.extension.boost.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: boostConnectionIconURL,
        connectionSmallIconURL: boostConnectionSmallIconURL,
        connectionTipIconURL: boostConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their BOOST."
                id="gui.extension.boost.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/boost'
    },
    {
        name: 'LEGO Education WeDo 2.0',
        extensionId: 'wedo2',
        collaborator: 'LEGO',
        iconURL: wedo2IconURL,
        insetIconURL: wedo2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: wedo2ConnectionIconURL,
        connectionSmallIconURL: wedo2ConnectionSmallIconURL,
        connectionTipIconURL: wedo2ConnectionTipIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their WeDo."
                id="gui.extension.wedo2.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/wedo'
    },
    {
        name: 'Go Direct Force & Acceleration',
        extensionId: 'gdxfor',
        collaborator: 'Vernier',
        iconURL: gdxforIconURL,
        insetIconURL: gdxforInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense push, pull, motion, and spin."
                description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
                id="gui.extension.gdxfor.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: gdxforConnectionIconURL,
        connectionSmallIconURL: gdxforConnectionSmallIconURL,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their force and acceleration sensor."
                id="gui.extension.gdxfor.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/vernier'
    },
/*
    {
        name: 'helloWorld',
        extensionId: 'helloWorld',
        iconURL: helloIconURL,
        insetIconURL: helloInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Hello"
                description="Description for the 'Hello' extension"
                id="helloWorld"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
*/
    {
        name: 'Drawing Toolkits',
        extensionId: 'mlcanvas',
        iconURL: mlcanvasIconURL,
        insetIconURL: mlcanvasInsetIconURL,
        description: "绘制直线、矩形和圆等，配合人脸检测、姿态检测等插件使用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Costume and Backdrop',
        extensionId: 'mlcostume',
        iconURL: mlcostumeIconURL,
        insetIconURL: mlcostumeInsetIconURL,
        description: "获取角色造型和舞台背景，配合计算机视觉类机器学习应用使用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Digital Recognition',
        extensionId: 'mldigits',
        iconURL: mldigitsIconURL,
        insetIconURL: mldigitsInsetIconURL,
        description: "绘制或拍摄0到9之间数字，实现手写数字识别（MNIST）应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Draw and Guess',
        extensionId: 'mlguess',
        iconURL: mlguessIconURL,
        insetIconURL: mlguessInsetIconURL,
        description: "绘制或拍摄345种物体草图，实现你画我猜（QuickDraw）应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Text Recognition',
        extensionId: 'mlocr',
        iconURL: mlocrIconURL,
        insetIconURL: mlocrInsetIconURL,
        description: "识别绘制或拍摄的中文或英文文本，用于构建文本识别相关应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Face Detection',
        extensionId: 'mlface',
        iconURL: mlfaceIconURL,
        insetIconURL: mlfaceInsetIconURL,
        description: "识别主机或小车摄像头拍摄的人脸，用于构建人脸检测相关应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Hand Detection',
        extensionId: 'mlhand',
        iconURL: mlhandIconURL,
        insetIconURL: mlhandInsetIconURL,
        description: "识别主机或小车摄像头拍摄的手势，用于构建手势检测相关应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Pose Detection',
        extensionId: 'mlpose',
        iconURL: mlposeIconURL,
        insetIconURL: mlposeInsetIconURL,
        description: "识别主机或小车摄像头拍摄的姿态，用于构建姿态检测相关应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Object Detection',
        extensionId: 'mlobject',
        iconURL: mlobjectIconURL,
        insetIconURL: mlobjectInsetIconURL,
        description: "识别主机或小车摄像头拍摄的80种常见物体，用于物体检测应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Image Classification',
        extensionId: 'mlimage',
        iconURL: mlimageIconURL,
        insetIconURL: mlimageInsetIconURL,
        description: "基于自定制的图片进行训练和预测，用于构建图像分类相关应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Iris Prediction',
        extensionId: 'mliris',
        iconURL: mlirisIconURL,
        insetIconURL: mlirisInsetIconURL,
        description: "基于公开鸢尾花（IRIS）数据集，实现基于文本的鸢尾花分类。",
        featured: true,
        internetConnectionRequired: true
    },
/*
    {
        name: 'Text Training',
        extensionId: 'mltext',
        iconURL: mltextIconURL,
        insetIconURL: mltextInsetIconURL,
        description: "基于自定义的文本数据集，训练个性化模型，实现文本分类应用。",
        featured: true,
        internetConnectionRequired: true
    },
*/
    {
        name: 'Speech Commands',
        extensionId: 'mlspeech',
        iconURL: mlspeechIconURL,
        insetIconURL: mlspeechInsetIconURL,
        description: "识别18种语音命令，配合机器人小车插件等实现机器学习应用",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Audio Training',
        extensionId: 'mlaudio',
        iconURL: mlaudioIconURL,
        insetIconURL: mlaudioInsetIconURL,
        description: "基于自定制的语音进行训练和预测，用于构建语音识别相关应用。",
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Chat Robot',
        extensionId: 'mlchat',
        iconURL: mlchatIconURL,
        insetIconURL: mlchatInsetIconURL,
        description: "基于百度和图灵API，实现语音聊天机器人，可配合其他插件使用。",
        featured: true,
        internetConnectionRequired: true
    },
    //{
    //    name: 'QR Code',
    //    extensionId: 'qrcode',
    //    iconURL: qrcodeIconURL,
    //    insetIconURL: qrcodeInsetIconURL,
    //    description: "QRCODE",
    //    featured: true,
    //    internetConnectionRequired: true
    //},
    {
        name: 'Deep Car',
        extensionId: 'mlcar',
        iconURL: mlcarIconURL,
        insetIconURL: mlcarInsetIconURL,
        description: "操作机器人小车的马达和摄像头，创建硬件相关的机器学习应用。",
        featured: true,
        internetConnectionRequired: true
    },
/*
    {
        name: 'Arduino',
        extensionId: 'Arduino',
        iconURL: arduinoIconURL,
        insetIconURL: arduinoInsetIconURL,
        description: "通过Arduino UNO主板对读取和控制各种传感器。",
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: arduinoConnectionIconURL,
        connectionSmallIconURL: arduinoConnectionSmallIconURL,
        connectingMessage: 'Connecting...'
    },
*/
    {
        name: 'Deep Sensor',
        extensionId: 'mlsensor',
        iconURL: mlsensorIconURL,
        insetIconURL: mlsensorInsetIconURL,
        description: "通过传感器主控板对读取和控制各种传感器。",
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: mlsensorConnectionIconURL,
        connectionSmallIconURL: mlsensorConnectionSmallIconURL,
        connectingMessage: 'Connecting...'
    },
    {
        name: 'LiteBee',
        extensionId: 'LiteBee',
        iconURL: litebeeIconURL,
        insetIconURL: litebeeInsetIconURL,
        description: "通过遥控器读取和控制无人机。",
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: litebeeConnectionIconURL,
        connectionSmallIconURL: litebeeConnectionSmallIconURL,
        connectingMessage: 'Connecting...'
    },
    {
        name: 'Tello',
        extensionId: 'Tello',
        iconURL: telloIconURL,
        insetIconURL: telloInsetIconURL,
        description: "通过无线读取和控制无人机。",
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: telloConnectionIconURL,
        connectionSmallIconURL: telloConnectionSmallIconURL,
        connectingMessage: 'Connecting...'
    }
];
