package com.nativebenchmark

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeBenchMarkPackage : BaseReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    if (name == NativeBenchMarkModule.NAME) {
      NativeBenchMarkModule(reactContext)
    } else {
      null
    }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      NativeBenchMarkModule.NAME to ReactModuleInfo(
        name = NativeBenchMarkModule.NAME,
        className = NativeBenchMarkModule::class.java.name,
        canOverrideExistingModule = false,
        needsEagerInit = false,
        isCxxModule = false,
        hasConstants = false, 
        isTurboModule = true
      )
    )
  }
}