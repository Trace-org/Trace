"use client"

import { useEffect, useState } from "react";
import { walletService } from "@/lib/wallet.service";
import { Button } from "./ui/button";
import { Loader2, Copy, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function WalletConnection() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setUserAddress(storedAddress);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const address = await walletService.connect();
      if (address) {
        setUserAddress(address);
        setIsConnected(true);
        localStorage.setItem("userAddress", address);
      } else {
        // User cancelled or an error occurred, and walletService.connect() returned undefined
        setError("Wallet connection cancelled or failed.");
      }
    } catch (err) {
      console.error("Failed to connect wallet:", err);
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await walletService.disconnect();
      setUserAddress(null);
      setIsConnected(false);
      localStorage.removeItem("userAddress");
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
      setError("Failed to disconnect wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (userAddress) {
      navigator.clipboard.writeText(userAddress);
      // Optionally, add a toast notification to indicate success
    }
  };

  return (
    <div className="flex items-center">
      {isConnected && userAddress ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>{userAddress.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span>{`${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy Address</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={disconnectWallet} disabled={isLoading} className="cursor-pointer">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              <span>Disconnect</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={connectWallet} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Connect Wallet
        </Button>
      )}
      {error && <p className="text-red-500 text-sm ml-4">{error}</p>}
    </div>
  );
}
