package com.nativebenchmark

import android.content.Context
import com.nativebenchmark.NativeBenchMarkSpec
import com.facebook.react.bridge.ReactApplicationContext
import android.os.Build
import com.facebook.react.bridge.Promise

class NativeBenchMarkModule(reactContext: ReactApplicationContext) : NativeBenchMarkSpec(reactContext) {

  override fun getName() = NAME

  override fun getBuild(promise: Promise){
    val model = Build.MODEL
    promise.resolve(model)
  }
  
  companion object {
    const val NAME = "NativeBenchMark"
  }
}