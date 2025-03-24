package com.nativebenchmark

// Import dos contextos e do Spec do módulo
import android.content.Context
import com.nativebenchmark.NativeBenchMarkSpec
import com.facebook.react.bridge.ReactApplicationContext

// Import da ponte com a promise
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap

// Import dos recursos do Android Build
import android.os.Build

// Import dos recursos do Android Wi-Fi
import android.net.wifi.WifiManager
import android.net.wifi.WifiInfo

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat

class NativeBenchMarkModule(reactContext: ReactApplicationContext) : NativeBenchMarkSpec(reactContext) {

    override fun getName() = NAME

    override fun getBuild(promise: Promise) {
        val model = Build.DEVICE
        promise.resolve(model)
    }
  
    override fun getWifiInfo(promise: Promise) {
        val context = reactApplicationContext
        
        if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            promise.reject("PERMISSION_DENIED", "Permissão negada")
            return
        }

        val wifiManager = context.getSystemService(Context.WIFI_SERVICE) as WifiManager
        if (!wifiManager.isWifiEnabled) {
            promise.reject("WIFI_DISABLED", "Wi-Fi está desativado")
            return
        }

        val wifiInfo: WifiInfo = wifiManager.connectionInfo
        if (wifiInfo == null || wifiInfo.networkId == -1) {
            promise.reject("NOT_CONNECTED", "Não conectado ao Wi-Fi")
            return
        }

        val wifiData: WritableMap = WritableNativeMap().apply {
            putInt("frequency", wifiInfo.frequency)
            putInt("linkSpeed", wifiInfo.linkSpeed)
            putInt("rssi", wifiInfo.rssi)
            putString("ssid", wifiInfo.ssid)
            putString("bssid", wifiInfo.bssid)
            putString("ipAddress", formatIpAddress(wifiInfo.ipAddress))
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                putInt("rxLinkSpeedMbps", wifiInfo.rxLinkSpeedMbps)
                putInt("txLinkSpeedMbps", wifiInfo.txLinkSpeedMbps)
            } else {
                putInt("rxLinkSpeedMbps", -1)
                putInt("txLinkSpeedMbps", -1)
            }
        }
        
        promise.resolve(wifiData)
    }

   private fun formatIpAddress(ipAddress: Int): String {
       return String.format(
           "%d.%d.%d.%d",
           ipAddress and 0xff,
           ipAddress shr 8 and 0xff,
           ipAddress shr 16 and 0xff,
           ipAddress shr 24 and 0xff
       )
   }

    companion object {
        const val NAME = "NativeBenchMark"
    }
}