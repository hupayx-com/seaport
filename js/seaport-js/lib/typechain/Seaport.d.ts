import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare type SpentItemStruct = {
    itemType: BigNumberish;
    token: string;
    identifier: BigNumberish;
    amount: BigNumberish;
};
export declare type SpentItemStructOutput = [number, string, BigNumber, BigNumber] & {
    itemType: number;
    token: string;
    identifier: BigNumber;
    amount: BigNumber;
};
export declare type ReceivedItemStruct = {
    itemType: BigNumberish;
    token: string;
    identifier: BigNumberish;
    amount: BigNumberish;
    recipient: string;
};
export declare type ReceivedItemStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber,
    string
] & {
    itemType: number;
    token: string;
    identifier: BigNumber;
    amount: BigNumber;
    recipient: string;
};
export declare type OfferItemStruct = {
    itemType: BigNumberish;
    token: string;
    identifierOrCriteria: BigNumberish;
    startAmount: BigNumberish;
    endAmount: BigNumberish;
};
export declare type OfferItemStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber,
    BigNumber
] & {
    itemType: number;
    token: string;
    identifierOrCriteria: BigNumber;
    startAmount: BigNumber;
    endAmount: BigNumber;
};
export declare type ConsiderationItemStruct = {
    itemType: BigNumberish;
    token: string;
    identifierOrCriteria: BigNumberish;
    startAmount: BigNumberish;
    endAmount: BigNumberish;
    recipient: string;
};
export declare type ConsiderationItemStructOutput = [
    number,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string
] & {
    itemType: number;
    token: string;
    identifierOrCriteria: BigNumber;
    startAmount: BigNumber;
    endAmount: BigNumber;
    recipient: string;
};
export declare type OrderComponentsStruct = {
    offerer: string;
    zone: string;
    offer: OfferItemStruct[];
    consideration: ConsiderationItemStruct[];
    orderType: BigNumberish;
    startTime: BigNumberish;
    endTime: BigNumberish;
    zoneHash: BytesLike;
    salt: BigNumberish;
    conduitKey: BytesLike;
    counter: BigNumberish;
};
export declare type OrderComponentsStructOutput = [
    string,
    string,
    OfferItemStructOutput[],
    ConsiderationItemStructOutput[],
    number,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    string,
    BigNumber
] & {
    offerer: string;
    zone: string;
    offer: OfferItemStructOutput[];
    consideration: ConsiderationItemStructOutput[];
    orderType: number;
    startTime: BigNumber;
    endTime: BigNumber;
    zoneHash: string;
    salt: BigNumber;
    conduitKey: string;
    counter: BigNumber;
};
export declare type OrderParametersStruct = {
    offerer: string;
    zone: string;
    offer: OfferItemStruct[];
    consideration: ConsiderationItemStruct[];
    orderType: BigNumberish;
    startTime: BigNumberish;
    endTime: BigNumberish;
    zoneHash: BytesLike;
    salt: BigNumberish;
    conduitKey: BytesLike;
    totalOriginalConsiderationItems: BigNumberish;
};
export declare type OrderParametersStructOutput = [
    string,
    string,
    OfferItemStructOutput[],
    ConsiderationItemStructOutput[],
    number,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    string,
    BigNumber
] & {
    offerer: string;
    zone: string;
    offer: OfferItemStructOutput[];
    consideration: ConsiderationItemStructOutput[];
    orderType: number;
    startTime: BigNumber;
    endTime: BigNumber;
    zoneHash: string;
    salt: BigNumber;
    conduitKey: string;
    totalOriginalConsiderationItems: BigNumber;
};
export declare type AdvancedOrderStruct = {
    parameters: OrderParametersStruct;
    numerator: BigNumberish;
    denominator: BigNumberish;
    signature: BytesLike;
    extraData: BytesLike;
};
export declare type AdvancedOrderStructOutput = [
    OrderParametersStructOutput,
    BigNumber,
    BigNumber,
    string,
    string
] & {
    parameters: OrderParametersStructOutput;
    numerator: BigNumber;
    denominator: BigNumber;
    signature: string;
    extraData: string;
};
export declare type CriteriaResolverStruct = {
    orderIndex: BigNumberish;
    side: BigNumberish;
    index: BigNumberish;
    identifier: BigNumberish;
    criteriaProof: BytesLike[];
};
export declare type CriteriaResolverStructOutput = [
    BigNumber,
    number,
    BigNumber,
    BigNumber,
    string[]
] & {
    orderIndex: BigNumber;
    side: number;
    index: BigNumber;
    identifier: BigNumber;
    criteriaProof: string[];
};
export declare type FulfillmentComponentStruct = {
    orderIndex: BigNumberish;
    itemIndex: BigNumberish;
}[];
export declare type FulfillmentComponentStructOutput = ([BigNumber, BigNumber] & {
    orderIndex: BigNumber;
    itemIndex: BigNumber;
})[];
export declare type ExecutionStruct = {
    item: ReceivedItemStruct;
    offerer: string;
    conduitKey: BytesLike;
};
export declare type ExecutionStructOutput = [
    ReceivedItemStructOutput,
    string,
    string
] & {
    item: ReceivedItemStructOutput;
    offerer: string;
    conduitKey: string;
};
export declare type OrderStruct = {
    parameters: OrderParametersStruct;
    signature: BytesLike;
};
export declare type OrderStructOutput = [OrderParametersStructOutput, string] & {
    parameters: OrderParametersStructOutput;
    signature: string;
};
export declare type AdditionalRecipientStruct = {
    amount: BigNumberish;
    recipient: string;
};
export declare type AdditionalRecipientStructOutput = [BigNumber, string] & {
    amount: BigNumber;
    recipient: string;
};
export declare type BasicOrderParametersStruct = {
    considerationToken: string;
    considerationIdentifier: BigNumberish;
    considerationAmount: BigNumberish;
    offerer: string;
    zone: string;
    offerToken: string;
    offerIdentifier: BigNumberish;
    offerAmount: BigNumberish;
    basicOrderType: BigNumberish;
    startTime: BigNumberish;
    endTime: BigNumberish;
    zoneHash: BytesLike;
    salt: BigNumberish;
    offererConduitKey: BytesLike;
    fulfillerConduitKey: BytesLike;
    totalOriginalAdditionalRecipients: BigNumberish;
    additionalRecipients: AdditionalRecipientStruct[];
    signature: BytesLike;
};
export declare type BasicOrderParametersStructOutput = [
    string,
    BigNumber,
    BigNumber,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    number,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    string,
    string,
    BigNumber,
    AdditionalRecipientStructOutput[],
    string
] & {
    considerationToken: string;
    considerationIdentifier: BigNumber;
    considerationAmount: BigNumber;
    offerer: string;
    zone: string;
    offerToken: string;
    offerIdentifier: BigNumber;
    offerAmount: BigNumber;
    basicOrderType: number;
    startTime: BigNumber;
    endTime: BigNumber;
    zoneHash: string;
    salt: BigNumber;
    offererConduitKey: string;
    fulfillerConduitKey: string;
    totalOriginalAdditionalRecipients: BigNumber;
    additionalRecipients: AdditionalRecipientStructOutput[];
    signature: string;
};
export declare type FulfillmentStruct = {
    offerComponents: FulfillmentComponentStruct[];
    considerationComponents: FulfillmentComponentStruct[];
};
export declare type FulfillmentStructOutput = [
    FulfillmentComponentStructOutput[],
    FulfillmentComponentStructOutput[]
] & {
    offerComponents: FulfillmentComponentStructOutput[];
    considerationComponents: FulfillmentComponentStructOutput[];
};
export interface SeaportInterface extends utils.Interface {
    contractName: "Seaport";
    functions: {
        "cancel((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256)[])": FunctionFragment;
        "fulfillAdvancedOrder(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes),(uint256,uint8,uint256,uint256,bytes32[])[],bytes32,address)": FunctionFragment;
        "fulfillAvailableAdvancedOrders(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes)[],(uint256,uint8,uint256,uint256,bytes32[])[],tuple[][],tuple[][],bytes32,address,uint256)": FunctionFragment;
        "fulfillAvailableOrders(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),bytes)[],tuple[][],tuple[][],bytes32,uint256)": FunctionFragment;
        "fulfillBasicOrder((address,uint256,uint256,address,address,address,uint256,uint256,uint8,uint256,uint256,bytes32,uint256,bytes32,bytes32,uint256,(uint256,address)[],bytes))": FunctionFragment;
        "fulfillOrder(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),bytes),bytes32)": FunctionFragment;
        "getCounter(address)": FunctionFragment;
        "getOrderHash((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256))": FunctionFragment;
        "getOrderStatus(bytes32)": FunctionFragment;
        "incrementCounter()": FunctionFragment;
        "information()": FunctionFragment;
        "matchAdvancedOrders(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes)[],(uint256,uint8,uint256,uint256,bytes32[])[],((uint256,uint256)[],(uint256,uint256)[])[])": FunctionFragment;
        "matchOrders(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),bytes)[],((uint256,uint256)[],(uint256,uint256)[])[])": FunctionFragment;
        "name()": FunctionFragment;
        "validate(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),bytes)[])": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "cancel", values: [OrderComponentsStruct[]]): string;
    encodeFunctionData(functionFragment: "fulfillAdvancedOrder", values: [AdvancedOrderStruct, CriteriaResolverStruct[], BytesLike, string]): string;
    encodeFunctionData(functionFragment: "fulfillAvailableAdvancedOrders", values: [
        AdvancedOrderStruct[],
        CriteriaResolverStruct[],
        FulfillmentComponentStruct[],
        FulfillmentComponentStruct[],
        BytesLike,
        string,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "fulfillAvailableOrders", values: [
        OrderStruct[],
        FulfillmentComponentStruct[],
        FulfillmentComponentStruct[],
        BytesLike,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "fulfillBasicOrder", values: [BasicOrderParametersStruct]): string;
    encodeFunctionData(functionFragment: "fulfillOrder", values: [OrderStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "getCounter", values: [string]): string;
    encodeFunctionData(functionFragment: "getOrderHash", values: [OrderComponentsStruct]): string;
    encodeFunctionData(functionFragment: "getOrderStatus", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "incrementCounter", values?: undefined): string;
    encodeFunctionData(functionFragment: "information", values?: undefined): string;
    encodeFunctionData(functionFragment: "matchAdvancedOrders", values: [
        AdvancedOrderStruct[],
        CriteriaResolverStruct[],
        FulfillmentStruct[]
    ]): string;
    encodeFunctionData(functionFragment: "matchOrders", values: [OrderStruct[], FulfillmentStruct[]]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "validate", values: [OrderStruct[]]): string;
    decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillAdvancedOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillAvailableAdvancedOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillAvailableOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillBasicOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "fulfillOrder", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOrderHash", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getOrderStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "incrementCounter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "information", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "matchAdvancedOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "matchOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validate", data: BytesLike): Result;
    events: {
        "CounterIncremented(uint256,address)": EventFragment;
        "OrderCancelled(bytes32,address,address)": EventFragment;
        "OrderFulfilled(bytes32,address,address,address,tuple[],tuple[])": EventFragment;
        "OrderValidated(bytes32,address,address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "CounterIncremented"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OrderCancelled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OrderFulfilled"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OrderValidated"): EventFragment;
}
export declare type CounterIncrementedEvent = TypedEvent<[
    BigNumber,
    string
], {
    newCounter: BigNumber;
    offerer: string;
}>;
export declare type CounterIncrementedEventFilter = TypedEventFilter<CounterIncrementedEvent>;
export declare type OrderCancelledEvent = TypedEvent<[
    string,
    string,
    string
], {
    orderHash: string;
    offerer: string;
    zone: string;
}>;
export declare type OrderCancelledEventFilter = TypedEventFilter<OrderCancelledEvent>;
export declare type OrderFulfilledEvent = TypedEvent<[
    string,
    string,
    string,
    string,
    SpentItemStructOutput[],
    ReceivedItemStructOutput[]
], {
    orderHash: string;
    offerer: string;
    zone: string;
    recipient: string;
    offer: SpentItemStructOutput[];
    consideration: ReceivedItemStructOutput[];
}>;
export declare type OrderFulfilledEventFilter = TypedEventFilter<OrderFulfilledEvent>;
export declare type OrderValidatedEvent = TypedEvent<[
    string,
    string,
    string
], {
    orderHash: string;
    offerer: string;
    zone: string;
}>;
export declare type OrderValidatedEventFilter = TypedEventFilter<OrderValidatedEvent>;
export interface Seaport extends BaseContract {
    contractName: "Seaport";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SeaportInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        cancel(orders: OrderComponentsStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        fulfillAdvancedOrder(advancedOrder: AdvancedOrderStruct, criteriaResolvers: CriteriaResolverStruct[], fulfillerConduitKey: BytesLike, recipient: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        fulfillAvailableAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, recipient: string, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        fulfillAvailableOrders(orders: OrderStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        fulfillBasicOrder(parameters: BasicOrderParametersStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        fulfillOrder(order: OrderStruct, fulfillerConduitKey: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getCounter(offerer: string, overrides?: CallOverrides): Promise<[BigNumber] & {
            counter: BigNumber;
        }>;
        getOrderHash(order: OrderComponentsStruct, overrides?: CallOverrides): Promise<[string] & {
            orderHash: string;
        }>;
        getOrderStatus(orderHash: BytesLike, overrides?: CallOverrides): Promise<[
            boolean,
            boolean,
            BigNumber,
            BigNumber
        ] & {
            isValidated: boolean;
            isCancelled: boolean;
            totalFilled: BigNumber;
            totalSize: BigNumber;
        }>;
        incrementCounter(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        information(overrides?: CallOverrides): Promise<[
            string,
            string,
            string
        ] & {
            version: string;
            domainSeparator: string;
            conduitController: string;
        }>;
        matchAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        matchOrders(orders: OrderStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string] & {
            contractName: string;
        }>;
        validate(orders: OrderStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    cancel(orders: OrderComponentsStruct[], overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    fulfillAdvancedOrder(advancedOrder: AdvancedOrderStruct, criteriaResolvers: CriteriaResolverStruct[], fulfillerConduitKey: BytesLike, recipient: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    fulfillAvailableAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, recipient: string, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    fulfillAvailableOrders(orders: OrderStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    fulfillBasicOrder(parameters: BasicOrderParametersStruct, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    fulfillOrder(order: OrderStruct, fulfillerConduitKey: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getCounter(offerer: string, overrides?: CallOverrides): Promise<BigNumber>;
    getOrderHash(order: OrderComponentsStruct, overrides?: CallOverrides): Promise<string>;
    getOrderStatus(orderHash: BytesLike, overrides?: CallOverrides): Promise<[
        boolean,
        boolean,
        BigNumber,
        BigNumber
    ] & {
        isValidated: boolean;
        isCancelled: boolean;
        totalFilled: BigNumber;
        totalSize: BigNumber;
    }>;
    incrementCounter(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    information(overrides?: CallOverrides): Promise<[
        string,
        string,
        string
    ] & {
        version: string;
        domainSeparator: string;
        conduitController: string;
    }>;
    matchAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    matchOrders(orders: OrderStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    validate(orders: OrderStruct[], overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        cancel(orders: OrderComponentsStruct[], overrides?: CallOverrides): Promise<boolean>;
        fulfillAdvancedOrder(advancedOrder: AdvancedOrderStruct, criteriaResolvers: CriteriaResolverStruct[], fulfillerConduitKey: BytesLike, recipient: string, overrides?: CallOverrides): Promise<boolean>;
        fulfillAvailableAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, recipient: string, maximumFulfilled: BigNumberish, overrides?: CallOverrides): Promise<[
            boolean[],
            ExecutionStructOutput[]
        ] & {
            availableOrders: boolean[];
            executions: ExecutionStructOutput[];
        }>;
        fulfillAvailableOrders(orders: OrderStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, maximumFulfilled: BigNumberish, overrides?: CallOverrides): Promise<[
            boolean[],
            ExecutionStructOutput[]
        ] & {
            availableOrders: boolean[];
            executions: ExecutionStructOutput[];
        }>;
        fulfillBasicOrder(parameters: BasicOrderParametersStruct, overrides?: CallOverrides): Promise<boolean>;
        fulfillOrder(order: OrderStruct, fulfillerConduitKey: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        getCounter(offerer: string, overrides?: CallOverrides): Promise<BigNumber>;
        getOrderHash(order: OrderComponentsStruct, overrides?: CallOverrides): Promise<string>;
        getOrderStatus(orderHash: BytesLike, overrides?: CallOverrides): Promise<[
            boolean,
            boolean,
            BigNumber,
            BigNumber
        ] & {
            isValidated: boolean;
            isCancelled: boolean;
            totalFilled: BigNumber;
            totalSize: BigNumber;
        }>;
        incrementCounter(overrides?: CallOverrides): Promise<BigNumber>;
        information(overrides?: CallOverrides): Promise<[
            string,
            string,
            string
        ] & {
            version: string;
            domainSeparator: string;
            conduitController: string;
        }>;
        matchAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], fulfillments: FulfillmentStruct[], overrides?: CallOverrides): Promise<ExecutionStructOutput[]>;
        matchOrders(orders: OrderStruct[], fulfillments: FulfillmentStruct[], overrides?: CallOverrides): Promise<ExecutionStructOutput[]>;
        name(overrides?: CallOverrides): Promise<string>;
        validate(orders: OrderStruct[], overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "CounterIncremented(uint256,address)"(newCounter?: null, offerer?: string | null): CounterIncrementedEventFilter;
        CounterIncremented(newCounter?: null, offerer?: string | null): CounterIncrementedEventFilter;
        "OrderCancelled(bytes32,address,address)"(orderHash?: null, offerer?: string | null, zone?: string | null): OrderCancelledEventFilter;
        OrderCancelled(orderHash?: null, offerer?: string | null, zone?: string | null): OrderCancelledEventFilter;
        "OrderFulfilled(bytes32,address,address,address,tuple[],tuple[])"(orderHash?: null, offerer?: string | null, zone?: string | null, recipient?: null, offer?: null, consideration?: null): OrderFulfilledEventFilter;
        OrderFulfilled(orderHash?: null, offerer?: string | null, zone?: string | null, recipient?: null, offer?: null, consideration?: null): OrderFulfilledEventFilter;
        "OrderValidated(bytes32,address,address)"(orderHash?: null, offerer?: string | null, zone?: string | null): OrderValidatedEventFilter;
        OrderValidated(orderHash?: null, offerer?: string | null, zone?: string | null): OrderValidatedEventFilter;
    };
    estimateGas: {
        cancel(orders: OrderComponentsStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        fulfillAdvancedOrder(advancedOrder: AdvancedOrderStruct, criteriaResolvers: CriteriaResolverStruct[], fulfillerConduitKey: BytesLike, recipient: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        fulfillAvailableAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, recipient: string, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        fulfillAvailableOrders(orders: OrderStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        fulfillBasicOrder(parameters: BasicOrderParametersStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        fulfillOrder(order: OrderStruct, fulfillerConduitKey: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getCounter(offerer: string, overrides?: CallOverrides): Promise<BigNumber>;
        getOrderHash(order: OrderComponentsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        getOrderStatus(orderHash: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        incrementCounter(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        information(overrides?: CallOverrides): Promise<BigNumber>;
        matchAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        matchOrders(orders: OrderStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        validate(orders: OrderStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        cancel(orders: OrderComponentsStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        fulfillAdvancedOrder(advancedOrder: AdvancedOrderStruct, criteriaResolvers: CriteriaResolverStruct[], fulfillerConduitKey: BytesLike, recipient: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        fulfillAvailableAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, recipient: string, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        fulfillAvailableOrders(orders: OrderStruct[], offerFulfillments: FulfillmentComponentStruct[], considerationFulfillments: FulfillmentComponentStruct[], fulfillerConduitKey: BytesLike, maximumFulfilled: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        fulfillBasicOrder(parameters: BasicOrderParametersStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        fulfillOrder(order: OrderStruct, fulfillerConduitKey: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getCounter(offerer: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getOrderHash(order: OrderComponentsStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getOrderStatus(orderHash: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        incrementCounter(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        information(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        matchAdvancedOrders(advancedOrders: AdvancedOrderStruct[], criteriaResolvers: CriteriaResolverStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        matchOrders(orders: OrderStruct[], fulfillments: FulfillmentStruct[], overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        validate(orders: OrderStruct[], overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
