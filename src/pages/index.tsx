import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";

import { useEthersProvider } from '@/hooks/Provider'
import { useEthersSigner } from '@/hooks/Signer'
import { ethers, Contract, formatEther, parseEther } from 'ethers'
import { useAccount, useBalance, useReadContract } from 'wagmi'
import { toast } from 'react-toastify';
import { zwjTokenContractConfig, exChangeContractConfig } from "@/config/ContractConfig";


export default function IndexPage() {


  const { isOpen: isOpenCreateOrder, onOpen: onOpenCreateOrder, onClose: onCloseCreateOrder, onOpenChange: onOpenChangeCreateOrder } = useDisclosure();
  const { isOpen: isOpenDepositEth, onOpen: onOpenDepositEth, onClose: onCloseDepositEth, onOpenChange: onOpenChangeDepositEth } = useDisclosure();
  const { isOpen: isOpenDepositZWJToken, onOpen: onOpenDepositZWJToken, onClose: onCloseDepositZWJToken, onOpenChange: onOpenChangeDepositZWJToken } = useDisclosure();
  const { isOpen: isOpenApprove, onOpen: onOpenApprove, onClose: onCloseApprove, onOpenChange: onOpenChangeApprove } = useDisclosure();


  const [orderList, setOrderList] = useState([]);
  const [fillOrderList, setFillOrderList] = useState([]);

  const columns = [
    // {
    //   key: "userAddress",
    //   label: "userAddress",
    // },
    {
      key: "tokenGet",
      label: "出售代币类型",
    },
    {
      key: "amountGet",
      label: "出售代币数量",
    },
    {
      key: "tokenGive",
      label: "需求代币类型",
    },
    {
      key: "amountGive",
      label: "需求代币数量",
    },
    {
      key: "action",
      label: "操作",
    },
  ];
  // const blacnh = ReadContract()

  const ETHER = "0x0000000000000000000000000000000000000000"

  const [userEth, setUserEth] = useState("")
  const [userToken, setUserToken] = useState("")
  const [exChangeEth, setExChangeEth] = useState("")
  const [exChangeZwjToken, setExChangeZwjToken] = useState("")


  const [exChangeOrder, setExChangeOrder] = useState("")
  const [userAddress, setUserAddress] = useState("")
  // const [signer, setSigner] = useState()
  // const [provider, setProvider] = useState()

  // const [account, setAccount] = useState()
  const [signerAddress, setSignerAddress] = useState("")



  // console.log("sign!!!!!!!!!!!!!!!er", signer);
  // setSigner(sig)
  // const setSigner = async () => {


  const signer = useEthersSigner()
  let account = useAccount()
  const provider = useEthersProvider()
  const { address, status } = useAccount();

  // 连接状态监视
  useEffect(() => {
    if (status === 'connected') {
      console.log(`Connected with address: ${address}`);
    } else if (status === 'disconnected') {
      // 账户断开或者切换账户
      console.log('Disconnected');
      setUserEth("")
      setUserToken("")

    }


  }, [status, address]);


  // 用户依赖全部完成阶段
  useEffect(() => {


    // setSigner(sig)

    // setProvider(prov)
    if (provider && signer && signer.address) {


      setSignerAddress(signer?.address)
      // toast("!")
      setUserAddress(signer?.address)


      getUserBalance(provider, signer)


      // fetchOrders();
      // fetchFillOrders();
      getOrderTableList()
    }


    if (account.status === 'connected') {

      // setAccount(accou)




    }


  }, [signer, provider,])

  useEffect(() => {


  }
    , [account])





  let zwjTokenResult = useReadContract({
    ...zwjTokenContractConfig,
    // account: signer?.address,
    account: address,
    functionName: 'balanceOf',
    // args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
    args: address ? [address] : [],

  })
  let exChangeEthResult = useReadContract({
    ...exChangeContractConfig,
    // account: signer?.address,
    account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    functionName: 'tokens',
    // args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
    args: address ? ["0x0000000000000000000000000000000000000000", address] : [],

  })

  let exChangeZwjTokenResult = useReadContract({
    ...exChangeContractConfig,
    // account: signer?.address,
    account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    functionName: 'tokens',
    // args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
    args: address ? [zwjTokenContractConfig.address, address] : [],

  })

  // let exChangeOrderResult = useReadContract({
  //   ...exChangeContractConfig,
  //   account: address,
  //   functionName: 'orders',
  // })

  console.log(signer);

  let contract = new Contract(exChangeContractConfig.address, exChangeContractConfig.abi, signer)
  let ZWJcontract = new Contract(zwjTokenContractConfig.address, zwjTokenContractConfig.abi, signer)










  // console.log("exChangeOrderResult", exChangeOrderResult);



  // const userEthResult = useBalance({
  //   address: address || undefined,
  // })
  // console.log("userEthResult", userEthResult.data?.formatted);



  const getUserBalance = async (provider, signer) => {
    console.log(signer, "!!!!!!!!!!!!!!!!!!!!!!!");

    const balance = await provider.getBalance(signer)
    console.log("balance", formatEther(balance));


    console.log(zwjTokenResult.data, exChangeEthResult, exChangeZwjTokenResult, "!!!!!!exChangeZwjTokenResult!!!!!!!!!!!!!!!!!");

    setUserEth(formatEther(balance))


    // setTimeout(async () => {
    //   const balance = await provider.getBalance(signer)
    //   console.log("balance", formatEther(balance));
    //   setUserEth(formatEther(balance))

    // }, 1);


    // console.log("result", result);

    // if (!zwjTokenResult || !exChangeEthResult || exChangeZwjTokenResult) return
    setUserToken(formatEther(zwjTokenResult.data))

    setExChangeEth(formatEther(exChangeEthResult.data))
    setExChangeZwjToken(formatEther(exChangeZwjTokenResult.data))


    // 获取交易所eth
    // console.log("!!!!!!!!!!!!!", await contract.tokens("0x0000000000000000000000000000000000000000", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"));


    // console.log(resOrderList[0]);




  }

  useEffect(() => {

    setTimeout(() => {

      try {
        // setUserToken(formatEther(zwjTokenResult.data))
        // setExChangeEth(formatEther(exChangeEthResult.data))
        // setExChangeZwjToken(formatEther(exChangeZwjTokenResult.data))
        if (zwjTokenResult.data && exChangeEthResult.data && exChangeZwjTokenResult.data) {
          setUserToken(formatEther(zwjTokenResult.data));
          setExChangeEth(formatEther(exChangeEthResult.data));
          setExChangeZwjToken(formatEther(exChangeZwjTokenResult.data));
        }
      } catch (error) {
        throw new Error("设置数据时出错");
        toast("设置数据时出错")
      }

    }, 1);

  }, [zwjTokenResult, exChangeEthResult, exChangeZwjTokenResult])




  const fetchOrders = async () => {


    // 获取所有取消的订单事件日志
    const cancelledOrdersFilter = contract.filters.Cancel();
    const cancelledOrdersLogs = await contract.queryFilter(cancelledOrdersFilter);
    const cancelledOrdersList = cancelledOrdersLogs.map(log => Number(contract.interface.parseLog(log).args.id));



    // 获取所有已执行的订单事件日志
    const filledOrdersFilter = contract.filters.Trade();
    const filledOrdersLogs = await contract.queryFilter(filledOrdersFilter);
    const filledOrdersList = filledOrdersLogs.map(log => Number(contract.interface.parseLog(log).args.id));




    // 过滤器定义，用于查询事件contract.filters.OrderCreated(): 使用合约实例的方法 filters 来创建一个过滤器，该过滤器用于查询名为 OrderCreated 的事件。
    const filter = contract.filters.order();
    const logs = await contract.queryFilter(filter);//使用合约实例的 queryFilter 方法来获取符合过滤器条件的事件日志。
    const parsedLogs = logs.map(log => contract.interface.parseLog(log));
    // console.log("创建的订单!!!!!!!!!!!!!!!", parsedLogs);

    console.log(parsedLogs, "ALL!!!!!!!!");


    const resOrderList = parsedLogs.map((item) => {
      return {
        id: Number(item?.args.id),
        userAddress: item?.args[1],
        tokenGet: item?.args[2],
        amountGet: formatEther(item?.args[3]),
        tokenGive: item?.args[4],
        amountGive: formatEther(item?.args[5]),
        timestamp: item?.args["timestamp"],
      }
    })

    // 过滤出特定用户的未取消和未执行的订单
    // const userOpenOrders = allOrders.filter(order =>
    //     order.addr === userAddress &&
    //     !cancelledOrders.includes(order.id) &&
    //     !filledOrders.includes(order.id)
    // );


    const fillterAllOrderList = resOrderList.filter((item) => {
      return (

        signer?.address === item.userAddress
        &&
        !filledOrdersList.includes(item.id)
        &&
        !cancelledOrdersList.includes(item.id)

      )

    })

    console.log(resOrderList);

    setOrderList(fillterAllOrderList)
  }

  const getOrderTableList = () => {
    fetchFillOrders()
    fetchOrders()

  }
  const fetchFillOrders = async () => {

    // 获取所有取消的订单事件日志
    const cancelledOrdersFilter = contract.filters.Cancel();
    const cancelledOrdersLogs = await contract.queryFilter(cancelledOrdersFilter);
    const cancelledOrdersList = cancelledOrdersLogs.map(log => Number(contract.interface.parseLog(log).args.id));



    // 获取所有已执行的订单事件日志
    const filledOrdersFilter = contract.filters.Trade();
    const filledOrdersLogs = await contract.queryFilter(filledOrdersFilter);
    const filledOrdersList = filledOrdersLogs.map(log => Number(contract.interface.parseLog(log).args.id));




    // 过滤器定义，用于查询事件contract.filters.OrderCreated(): 使用合约实例的方法 filters 来创建一个过滤器，该过滤器用于查询名为 OrderCreated 的事件。
    const filter = contract.filters.order();
    const logs = await contract.queryFilter(filter);//使用合约实例的 queryFilter 方法来获取符合过滤器条件的事件日志。
    const parsedLogs = logs.map(log => contract.interface.parseLog(log));
    // console.log("创建的订单!!!!!!!!!!!!!!!", parsedLogs);

    console.log(parsedLogs, "ALL!!!!!!!!");


    const resOrderList = parsedLogs.map((item) => {
      return {
        id: Number(item?.args.id),
        userAddress: item?.args[1],
        tokenGet: item?.args[2],
        amountGet: formatEther(item?.args[3]),
        tokenGive: item?.args[4],
        amountGive: formatEther(item?.args[5]),
        timestamp: item?.args["timestamp"],
      }
    })

    // 过滤出特定用户的未取消和未执行的订单
    // const userOpenOrders = allOrders.filter(order =>
    //     order.addr === userAddress &&
    //     !cancelledOrders.includes(order.id) &&
    //     !filledOrders.includes(order.id)
    // );


    const fillterAllOrderList = resOrderList.filter((item) => {
      return (

        signer?.address !== item.userAddress
        &&
        !filledOrdersList.includes(item.id)
        &&
        !cancelledOrdersList.includes(item.id)

      )

    })

    console.log(fillterAllOrderList, "fillterAllOrderList");

    setFillOrderList(fillterAllOrderList)

  }


  const onMakeOrder = async () => {

    // console.log("aaa", makeOrderForm);

    console.log({
      "tokenGet": makeOrderForm.tokenGet,
      "amountGet": parseEther(makeOrderForm.amountGet),
      "tokenGive": makeOrderForm.tokenGive,
      "amountGive": parseEther(makeOrderForm.amountGive),
    });


    try {
      const tx = await contract.makeOrder(
        makeOrderForm.tokenGet,
        parseEther(makeOrderForm.amountGet),
        // ethers.utils.parseUnits(makeOrderForm.amountGet, 'ether'),
        makeOrderForm.tokenGive,
        parseEther(makeOrderForm.amountGive)
        // ethers.utils.parseUnits(makeOrderForm.amountGive, 'ether')
      );
      await tx.wait();
      console.log('Order created successfully');

      toast("create order success!")
      onCloseCreateOrder()

      getOrderTableList()
      // let exChangeZwjTokenResult = useReadContract({
      //   ...exChangeContractConfig,
      //   // account: signer?.address,
      //   account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      //   functionName: 'makeOrder',
      //   // args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
      //   args: address ? [

      //     makeOrderForm.tokenGet,
      //     parseEther(makeOrderForm.amountGet),

      //     makeOrderForm.tokenGive,
      //     parseEther(makeOrderForm.amountGive)


      //   ] : [],

      // })


    } catch (error) {
      console.error('Error creating order:', error);
    }


  }

  // 取消订单
  const onCancelOrder = async (row) => {


    const orderId = row.id
    try {
      const tx = await contract.cancelOrder(
        orderId
      );
      await tx.wait();


      toast("cancel order success!")
      // onCloseCreateOrder()

      fetchOrders()


    } catch (error) {
      console.error('Error creating order:', error);
    }




  }
  // 充值ETH到交易所
  const onDepositEth = async () => {



    try {
      const tx = await contract.depositEther({
        value: parseEther(DepositEthForm.value) // 存入 1 ETH
      });
      await tx.wait();


      toast("success!")


      onCloseDepositEth()

      getOrderTableList()


    } catch (error) {
      console.error('Error creating order:', error);
    }
  }
  // 充值Token到交易所
  const onDepositZWJToken = async () => {



    try {
      // const tx = await contract.depositToken(zwjTokenContractConfig.address, {
      //   value: parseEther(DepositZWJTokenForm.value) // 
      //   // value: (DepositZWJTokenForm.value) // 
      // });
      const tx = await contract.depositToken(zwjTokenContractConfig.address, parseEther(DepositZWJTokenForm.value));
      await tx.wait();


      toast("success!")


      onCloseDepositZWJToken()

      getOrderTableList()


    } catch (error) {
      console.error('Error creating order:', error);
    }
  }
  // onApprove
  const onApprove = async () => {



    try {
      // const tx = await contract.depositToken(zwjTokenContractConfig.address, {
      //   value: parseEther(DepositZWJTokenForm.value) // 
      //   // value: (DepositZWJTokenForm.value) // 
      // });
      const tx = await ZWJcontract.approve(exChangeContractConfig.address, parseEther(ApproveForm.value));
      await tx.wait();


      toast("success!")


      onCloseApprove()

      getOrderTableList()


    } catch (error) {
      console.error('Error creating order:', error);
    }
  }
  const onFillOrder = async (row) => {


    const orderId = row.id
    try {
      const tx = await contract.fillOrder(
        orderId
      );
      await tx.wait();


      toast("FillOrder order success!")


      getOrderTableList()


    } catch (error) {
      console.error('Error creating order:', error);
    }




  }

  const [makeOrderForm, setMakeOrderForm] = useState({
    tokenGet: "",
    amountGet: "",
    tokenGive: "",
    amountGive: "",
  })
  const [DepositEthForm, setDepositEthForm] = useState({
    value: "",
  })
  const [DepositZWJTokenForm, setDepositZWJTokenForm] = useState({
    value: "",
  })
  const [ApproveForm, setApproveForm] = useState({
    contract: zwjTokenContractConfig.address,
    value: "",
  })


  const list = [
    {
      id: "1",
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      id: "2",
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },

    {
      id: "3",
      title: "交易所中的ETH",
      img: "https://tokpie.io/blog/wp-content/uploads/2018/12/Ethereum.jpeg",
      price: "$12.20",
    },
    {
      id: "4",
      title: "交易所中的代币",
      img: "https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9pYkcxWDROT29zRnJjVmd2MmljeTI2dFFyRGlhWW1md2ZaalhlOEgzUWliendyc2hxczVWaWNjU2swbjh1Nm1weDFodzBFbTkzdDBmZ3puTkdUZUpDR3hXWjd3LzY0MA?x-oss-process=image/format,png",
      price: "$7.50",
    },

  ];


  // const REPLACE_ENV_BASE_URL = process.env.REPLACE_ENV_BASE_URL;

  return (
    <DefaultLayout>
      {/* <h1> 地址:{signerAddress}</h1> */}
      <h3>钱包中的ETH:{userEth}</h3>
      <h3>钱包中的ZWJ代币:  {userToken}</h3>
      <Button onPress={onOpenApprove}>approve允许交易所提取代币</Button>

      {/* <h3>钱包中的ZWJ代币:   <ReadContract  ></ReadContract></h3> */}

      {/* <h3>交易所中的ETH: <ReadExchangeEthContract></ReadExchangeEthContract></h3> */}
      {/* <h3>交易所中的ETH: {exChangeEth}  <Button onPress={onOpenDepositEth}>充值ETH</Button></h3> */}
      {/* <h3>交易所中的ZWJ代币{exChangeZwjToken} <Button onPress={onOpenDepositZWJToken}>充值ZWJ代币</Button></h3> */}

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {/* {list.map((item, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))} */}

        <Card shadow="sm" key={1} isPressable onPress={onOpenDepositEth}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={"交易所中的ETH"}
              className="w-full object-cover h-[140px]"
              src={"https://tokpie.io/blog/wp-content/uploads/2018/12/Ethereum.jpeg"}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{"交易所中的ETH"}</b>
            <p className="text-default-500">{exChangeEth}</p>
          </CardFooter>
        </Card>
        <Card shadow="sm" key={2} isPressable onPress={onOpenDepositZWJToken}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={"交易所中的ZWJ代币"}
              className="w-full object-cover h-[140px]"
              src={"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9pYkcxWDROT29zRnJjVmd2MmljeTI2dFFyRGlhWW1md2ZaalhlOEgzUWliendyc2hxczVWaWNjU2swbjh1Nm1weDFodzBFbTkzdDBmZ3puTkdUZUpDR3hXWjd3LzY0MA?x-oss-process=image/format,png"}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{"交易所中的ZWJ代币"}</b>
            <p className="text-default-500">{exChangeZwjToken}</p>
          </CardFooter>
        </Card>

      </div>

      <div>
        <h2>我创建的订单   <Button onPress={onOpenCreateOrder}>创建订单</Button></h2>
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={orderList}>
            {/* {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )} */}
            {/* {orderList.map((row) =>
              <TableRow key={row.id}>
                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
              </TableRow>
            )} */}
            {orderList.map((row) => (
              <TableRow key={row.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === 'action' ? (
                      <Button onClick={() => onCancelOrder(row)}>取消</Button>
                    ) : (
                      getKeyValue(row, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>


        买入
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={orderList}>
            {/* {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )} */}
            {/* {orderList.map((row) =>
              <TableRow key={row.id}>
                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
              </TableRow>
            )} */}
            {fillOrderList.map((row) => (
              <TableRow key={row.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === 'action' ? (
                      <Button onClick={() => onFillOrder(row)}>交易</Button>
                    ) : (
                      getKeyValue(row, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>


        {/* 已完成 */}


        <>

          <Modal isOpen={isOpenCreateOrder} onOpenChange={onOpenChangeCreateOrder}>
            <ModalContent>
              {(onCloseCreateOrder) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">发起交易订单</ModalHeader>
                  <ModalBody>
                    <div>
                      <Input
                        type="text"
                        label="出售代币类型"
                        placeholder="Enter token type"
                        name="tokenGet" // 设置 name 属性
                        value={makeOrderForm.tokenGive} // 设置 value 属性
                        onChange={(e) => setMakeOrderForm({ ...makeOrderForm, tokenGive: e.target.value })} // 内联 onChange
                      />
                      <Input
                        type="text"
                        label="出售代币数量"
                        placeholder="Enter amount needed"
                        name="amountGet"
                        value={makeOrderForm.amountGive}
                        onChange={(e) => setMakeOrderForm({ ...makeOrderForm, amountGive: e.target.value })} // 内联 onChange
                      />
                      <Input
                        type="text"
                        label=" 需要的类型"
                        placeholder="Enter token to give"
                        name="tokenGive"
                        value={makeOrderForm.tokenGet}
                        onChange={(e) => setMakeOrderForm({ ...makeOrderForm, tokenGet: e.target.value })} // 内联 onChange
                      />
                      <Input
                        type="text"
                        label="需要的代币量"
                        placeholder="Enter amount to give"
                        name="amountGive"
                        value={makeOrderForm.amountGet}
                        onChange={(e) => setMakeOrderForm({ ...makeOrderForm, amountGet: e.target.value })} // 内联 onChange
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onCloseCreateOrder}>
                      取消
                    </Button>
                    <Button color="primary" onPress={onMakeOrder}>
                      确定
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>

        <>

          <Modal isOpen={isOpenDepositEth} onOpenChange={onOpenChangeDepositEth}>
            <ModalContent>
              {(onCloseDepositZWJToken) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">充值ETH到交易所</ModalHeader>
                  <ModalBody>
                    <div>
                      <Input
                        type="text"
                        label="充值ETH数量"
                        placeholder="Enter token type"
                        name="tokenGet" // 设置 name 属性
                        value={DepositEthForm.value} // 设置 value 属性
                        onChange={(e) => setDepositEthForm({ ...DepositEthForm, value: e.target.value })} // 内联 onChange
                      />


                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onCloseDepositZWJToken}>
                      取消
                    </Button>
                    <Button color="primary" onPress={onDepositEth}>
                      确定
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>


        <>
          <Modal isOpen={isOpenDepositZWJToken} onOpenChange={onOpenChangeDepositZWJToken}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">充值代币到交易所</ModalHeader>
                  <ModalBody>
                    <div>
                      <Input
                        type="text"
                        label="充值ZWJToken数量"
                        placeholder="Enter token type"
                        name="tokenGet" // 设置 name 属性
                        value={DepositZWJTokenForm.value} // 设置 value 属性
                        onChange={(e) => setDepositZWJTokenForm({ ...DepositZWJTokenForm, value: e.target.value })} // 内联 onChange
                      />


                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      取消
                    </Button>
                    <Button color="primary" onPress={onDepositZWJToken}>
                      确定
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>


        <>
          <Modal isOpen={isOpenApprove} onOpenChange={onOpenChangeApprove}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Apprve授权交易所转账</ModalHeader>
                  <ModalBody>
                    <div>
                      <Input
                        type="text"
                        label="代币合约地址"
                        placeholder="Enter token type"
                        name="tokenGet" // 设置 name 属性
                        value={ApproveForm.contract} // 设置 value 属性
                      // onChange={(e) => setDepositZWJTokenForm({ ...DepositZWJTokenForm, value: e.target.value })} // 内联 onChange
                      />
                      <Input
                        type="text"
                        label="充值数量"
                        placeholder="Enter token type"
                        name="tokenGet" // 设置 name 属性
                        value={ApproveForm.value} // 设置 value 属性
                        onChange={(e) => setApproveForm({ ...ApproveForm, value: e.target.value })} // 内联 onChange
                      />

                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      取消
                    </Button>
                    <Button color="primary" onPress={onApprove}>
                      确定
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      </div>


    </DefaultLayout>
  );
}



// function ReadContract() {

//   const { data: balance } = useReadContract({
//     ...zwjTokenContractConfig,
//     // account: signer?.address,
//     account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//     functionName: 'balanceOf',
//     args: ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'],
//   })

//   return (<span> {balance?.toString()}</span>)
// }
async function ReadEthBalance() {

  const provider = useEthersProvider()
  const balance = await provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  return (
    <span>{(balance?.toString())}</span>

  )
}


// function ReadExchangeEthContract() {
//   const { data: balance } = useReadContract({
//     ...exChangeContractConfig,
//     // address: exChangeContractConfig.address,
//     // abi: exChangeContractConfig.abi,
//     account: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
//     functionName: 'tokens',
//     args: ['0x0000000000000000000000000000000000000000', "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
//   })
//   console.log("balance", balance);

//   return (
//     <span>{(balance?.toString())}</span>

//   )
// }


const getUser = async () => {
  const provider = useEthersProvider()
  const signer = useEthersSigner()

  console.log("blance!!", await provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"));

  console.log("address", signer?.address);


}
