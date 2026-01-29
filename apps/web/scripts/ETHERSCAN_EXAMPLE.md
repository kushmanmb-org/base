# Etherscan API Example

This directory contains an example demonstrating how to fetch data from the Etherscan API v2.

## Files

- `fetchEtherscanExample.js` - Basic example showing a simple fetch request to the Etherscan API

## Usage

### Basic Example

The `fetchEtherscanExample.js` file demonstrates the simplest possible fetch request:

```javascript
const options = { method: 'GET' };

fetch('https://api.etherscan.io/v2/api', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

### Recommended: Using the Proxy Endpoint

For production use in this application, use the `/api/proxy` endpoint which provides:

- **Secure API key management** - Keys are stored in environment variables and never exposed to the client
- **Enhanced error handling** - Proper error responses and retry logic
- **Multi-chain support** - Ethereum mainnet, Base, and Base Sepolia

#### Example Usage:

```javascript
// Fetch Ethereum mainnet transactions
const response = await fetch('/api/proxy?apiType=etherscan&address=0x...');
const data = await response.json();

// Fetch Base mainnet transactions  
const response = await fetch('/api/proxy?apiType=basescan&address=0x...');
const data = await response.json();

// Fetch Base Sepolia testnet transactions
const response = await fetch('/api/proxy?apiType=base-sepolia&address=0x...');
const data = await response.json();

// Fetch Base internal transactions
const response = await fetch('/api/proxy?apiType=basescan-internal&address=0x...');
const data = await response.json();
```

## Environment Configuration

To use the Etherscan API, you need to set up environment variables:

1. Copy `.env.local.example` to `.env.local`
2. Add your Etherscan API key:
   ```
   ETHERSCAN_API_KEY=your_api_key_here
   ```

## API Documentation

For more information about the Etherscan API v2, visit:
- [Etherscan API Documentation](https://docs.etherscan.io/)

## Implementation Details

The proxy implementation can be found at:
- `apps/web/app/(basenames)/api/proxy/route.ts`

The proxy is used by the heatmap component:
- `apps/web/src/components/Basenames/UsernameProfileSectionHeatmap/index.tsx`
