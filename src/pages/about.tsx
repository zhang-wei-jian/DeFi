import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { zwjTokenContractConfig, exChangeContractConfig } from "@/config/ContractConfig";
import { Card, CardBody } from "@nextui-org/react";
export default function DocsPage() {
  return (
    <DefaultLayout>



      <Card>
        <CardBody>
          <p>交易所合约地址为:{exChangeContractConfig.address}</p>

        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <p>交易所ZWJ代币合约地址为:{zwjTokenContractConfig.address}</p>

        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <p>交易所原生币ETH合约地址为:0x0000000000000000000000000000000000000000</p>

        </CardBody>
      </Card>

      <Card>
        <CardBody>

          <p> RPC URL:
            http://aisuperhero.xyz:8545</p>
          <p> 链 ID:
            31337</p>
          <p>  货币符号:
            ETH</p>
        </CardBody>
      </Card>






    </DefaultLayout>
  );
}
