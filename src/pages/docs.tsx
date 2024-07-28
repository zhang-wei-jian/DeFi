


import DefaultLayout from "@/layouts/default";


import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
export default function DocsPage() {

  const { data: hash, sendTransaction } = useSendTransaction()


  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }


  return (
    <DefaultLayout>

      转ETH原生币到

      <form onSubmit={submit}>
        <input name="address" placeholder="0xA0Cf…251e" required />
        <input name="value" placeholder="0.05" required />
        <button type="submit">Send</button>

        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
    </DefaultLayout>
  );
}
