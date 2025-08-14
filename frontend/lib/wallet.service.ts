import {
  FREIGHTER_ID,
  FreighterModule,
  type ISupportedWallet,
  StellarWalletsKit,
  WalletNetwork,
} from "@creit.tech/stellar-wallets-kit";
import { stellarService, type StellarService } from "../service/stellar.service";

class WalletService {
  private readonly kit: StellarWalletsKit;
  private readonly stellarService: StellarService;

  constructor(stellarService: StellarService) {
    this.stellarService = stellarService;
    this.kit = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: [new FreighterModule()],
    });
  }

  async connect(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.kit.openModal({
        modalTitle: "Connect to your wallet",
        onWalletSelected: async (option: ISupportedWallet) => {
          try {
            this.kit.setWallet(option.id);

            // Wait a tiny bit for wallet to initialize
            await new Promise(res => setTimeout(res, 100));

            const { address } = await this.kit.getAddress();

            if (!address) throw new Error("Failed to get wallet address");

            // Optional: extra delay to ensure wallet is ready
            await new Promise(res => setTimeout(res, 200));

            resolve(address);
          } catch (err) {
            reject(err);
          }
        },
      });
    });
  }

  async disconnect(): Promise<void> {
    await this.kit.disconnect();
  }

  async signTransaction(xdr: string): Promise<{
    signedTxXdr: string;
    signedAddress?: string;
  }> {
    const environment = this.stellarService.environment();
    return await this.kit.signTransaction(xdr, {networkPassphrase: environment.networkPassphrase});
  }
}

export const walletService = new WalletService(stellarService);
