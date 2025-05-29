"use client"

import { useState } from "react"
import { Wallet, Plus, Minus, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SolanaCounter() {
  const [count, setCount] = useState(0)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleWalletConnect = () => {
    // In a real app, this would integrate with @solana/wallet-adapter
    if (!isWalletConnected) {
      setIsWalletConnected(true)
      setWalletAddress("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU")
    } else {
      setIsWalletConnected(false)
      setWalletAddress("")
    }
  }

  const increment = () => {
    if (isWalletConnected) {
      setCount((prev) => prev + 1)
    }
  }

  const decrement = () => {
    if (isWalletConnected) {
      setCount((prev) => prev - 1)
    }
  }

  const reset = () => {
    if (isWalletConnected) {
      setCount(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-8 w-8 text-yellow-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sol-Counter
            </h1>
          </div>
          <p className="text-purple-200 text-sm">A decentralized counter on Solana</p>
        </div>

        {/* Wallet Connection */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-center text-lg">Wallet Connection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleWalletConnect}
              className={`w-full ${
                isWalletConnected
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              } text-white font-semibold py-3`}
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isWalletConnected ? "Disconnect Wallet" : "Connect Wallet"}
            </Button>

            {isWalletConnected && (
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-center bg-green-100 text-green-800">
                  Connected
                </Badge>
                <p className="text-xs text-purple-200 text-center font-mono break-all">
                  {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Counter */}
        <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-center text-lg">Counter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Counter Display */}
            <div className="text-center">
              <div className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
                {count}
              </div>
              <p className="text-purple-200 text-sm">Current Count</p>
            </div>

            {/* Counter Controls */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={decrement}
                disabled={!isWalletConnected}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:opacity-50 text-white font-semibold py-3"
              >
                <Minus className="h-5 w-5" />
              </Button>

              <Button
                onClick={reset}
                disabled={!isWalletConnected}
                variant="outline"
                className="border-purple-400 text-purple-200 hover:bg-purple-600 hover:text-white disabled:border-gray-600 disabled:text-gray-400 disabled:hover:bg-transparent font-semibold py-3"
              >
                Reset
              </Button>

              <Button
                onClick={increment}
                disabled={!isWalletConnected}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:opacity-50 text-white font-semibold py-3"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>

            {!isWalletConnected && (
              <p className="text-center text-purple-300 text-sm">Connect your wallet to use the counter</p>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-purple-300 text-xs">Built on Solana • Powered by Web3</div>
      </div>
    </div>
  )
}
