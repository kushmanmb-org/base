/**
 * Example script demonstrating how to fetch data from Etherscan API v2
 * 
 * This script shows a basic fetch request to the Etherscan API.
 * 
 * IMPORTANT: For production use, use the proxy endpoint at /api/proxy
 * which includes:
 * - Proper API key management from environment variables
 * - Enhanced error handling
 * - Support for multiple chain IDs (Ethereum mainnet, Base, Base Sepolia)
 * - Secure API key handling (not exposed to the client)
 * 
 * Usage:
 * - Direct API call (requires API key in URL):
 *   fetch('https://api.etherscan.io/v2/api?module=account&action=txlist&address=0x...&chainid=1&apikey=YOUR_KEY')
 * 
 * - Using the proxy endpoint (recommended):
 *   fetch('/api/proxy?apiType=etherscan&address=0x...')
 *   fetch('/api/proxy?apiType=basescan&address=0x...')
 *   fetch('/api/proxy?apiType=base-sepolia&address=0x...')
 * 
 * @see apps/web/app/(basenames)/api/proxy/route.ts for proxy implementation
 */

const options = { method: 'GET' };

fetch('https://api.etherscan.io/v2/api', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));
