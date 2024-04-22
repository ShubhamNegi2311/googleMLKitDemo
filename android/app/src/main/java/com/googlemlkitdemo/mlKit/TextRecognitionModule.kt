package com.googlemlkitdemo.mlKit

import android.graphics.Rect
import android.net.Uri
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.text.TextRecognition
import com.google.mlkit.vision.text.latin.TextRecognizerOptions
import java.io.IOException


class TextRecognitionModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "TextRecognitionModule"

    @ReactMethod
    fun recognizeImage(imageURL: String, promise: Promise) {
        Log.d("TextRecognitionModule", "IMAGE_URL ===>${imageURL}")

        val image: InputImage
        var uri = Uri.parse(imageURL)
        try {
            image = InputImage.fromFilePath(reactApplicationContext, uri)

            // When using Latin script library
            val recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS)

            val result = recognizer.process(image)
                .addOnSuccessListener { visionText ->
                    // Task completed successfully
                    val response: WritableMap = Arguments.createMap();

                    response.putInt("width", image.width);
                    response.putInt("height", image.height)

                    val blocks: WritableArray = Arguments.createArray()


                    for (block in visionText.textBlocks) {
                        val blockObject: WritableMap = Arguments.createMap()
                        blockObject.putString("text", block.text)
                        block?.boundingBox?.let { data ->
                            blockObject.putMap("rect", getRectMap(data))
                        }

                        val lines: WritableArray = Arguments.createArray()
                        for (line in block.lines) {
                            val lineObject: WritableMap = Arguments.createMap()
                            lineObject.putString("text", block.text)
                            line.boundingBox?.let { data ->
                                lineObject.putMap("rect", getRectMap(data))
                            }

                            lines.pushMap(lineObject)
                        }
                        blockObject.putArray("lines", lines)
                        blocks.pushMap(blockObject)
                    }

                    response.putArray("blocks", blocks)
                    promise.resolve(response);
                }
                .addOnFailureListener { e ->
                    // Task failed with an exception
                    promise.reject("Text Recognition failed!", e)
                }
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    fun getRectMap(rect: Rect): WritableMap {

        val rectObject: WritableMap = Arguments.createMap()
        rectObject.putInt("left", rect.left)
        rectObject.putInt("top", rect.top)
        rectObject.putInt("width", rect.right - rect.left)
        rectObject.putInt("height", rect.bottom - rect.top)

        return rectObject
    }

}