import {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonSkeletonText,
    IonThumbnail,
    IonCardContent, IonCardSubtitle, IonCard
} from "@ionic/react";
import React, {useState} from "react";
import "./Market.css";
import {connect, useSelector} from "react-redux";
import CategoryItem from "./CategoryItem";
import ShopHeader from "../components/ShopHeader";
import {useFirestoreConnect, FirestoreReducer} from "react-redux-firebase";
import {useParams} from "react-router";
import {RootState, Markets} from "../model/DomainModels";
import {CartState} from "../services/FirebaseIniti";
import MarketHeader from "../components/MarketHeader";
import CartModal from "./Cart";
import {FirestoreIonImg} from "../services/FirebaseStorage";

const Market: React.FC = () => {

    const profile = useSelector<RootState>(state => state.firebase.profile)
    console.log("User Profile:");
    console.log(profile);
    const {market_id} = useParams<{ market_id: string }>();
    var shop = {} as Markets;
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const CartBadge: React.FC<CartState> = ({cart}) => {
        const cartSize = cart.cartItemList.length;
        if (cartSize > 0) {
            return <IonBadge color="danger">{cart.cartItemList.length}</IonBadge>;
        } else {
            return <div></div>;
        }
    };

    useFirestoreConnect([
        {collection: "Markets", doc: market_id, storeAs: "Market"},
        {
            collection: "Markets",
            doc: market_id,
            subcollections: [
                {
                    collection: "Categories"
                }
            ],
            storeAs: "Categories"
        }
    ]);
    const doneLoading = () => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }

    const stateStore = useSelector<RootState>(
        state => state.firestore
    ) as FirestoreReducer.Reducer;

    if (stateStore.ordered.Market && stateStore.ordered.Market.length > 0) {
        stateStore.ordered.Market.map(tmarket => {
            console.log(tmarket.name);
            shop = tmarket;
            return shop;
        });
        doneLoading()
    } else {
        doneLoading()
    }

    function mapStateToProps(state: CartState) {
        const {firebase, cart, shop} = state;
        return {firebase, cart, shop};
    }

    const [CartCounter] = useState<React.ElementType>(connect(mapStateToProps)(CartBadge));
    const [ShopHeaderWithShop] = useState<React.ElementType>(connect(mapStateToProps)(ShopHeader));

    return (
        <IonPage>
            <MarketHeader setShowModal={setShowModal} shop={shop} CartCounter={CartCounter}/>

            <IonContent className="category" fullscreen>
                <ShopHeaderWithShop/>
                <IonGrid>
                    <IonRow>
                        {
                            loading ?
                                <>
                                    <IonCol>
                                        <IonCard class="category-skeleton-image" >
                                            <IonCardContent>
                                                <IonThumbnail class="skeleton-image" >
                                                    <IonSkeletonText animated />
                                                </IonThumbnail>
                                                {/* <IonImg src={category.img_url as string}></IonImg> */}
                                                <IonCardSubtitle className="category_name ion-text-capitalize"><IonSkeletonText animated/></IonCardSubtitle>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol>
                                        <IonCard class="category-skeleton-image" >
                                            <IonCardContent>
                                                <IonThumbnail class="skeleton-image" >
                                                    <IonSkeletonText animated />
                                                </IonThumbnail>
                                                {/* <IonImg src={category.img_url as string}></IonImg> */}
                                                <IonCardSubtitle className="category_name ion-text-capitalize"><IonSkeletonText animated/></IonCardSubtitle>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol>
                                        <IonCard class="category-skeleton-image" >
                                            <IonCardContent>
                                                <IonThumbnail class="skeleton-image" >
                                                    <IonSkeletonText animated />
                                                </IonThumbnail>
                                                {/* <IonImg src={category.img_url as string}></IonImg> */}
                                                <IonCardSubtitle className="category_name ion-text-capitalize"><IonSkeletonText animated/></IonCardSubtitle>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol>
                                        <IonCard class="category-skeleton-image" >
                                            <IonCardContent>
                                                <IonThumbnail class="skeleton-image" >
                                                    <IonSkeletonText animated />
                                                </IonThumbnail>
                                                {/* <IonImg src={category.img_url as string}></IonImg> */}
                                                <IonCardSubtitle className="category_name ion-text-capitalize"><IonSkeletonText animated/></IonCardSubtitle>
                                            </IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </>
                                :
                                <>
                                    {stateStore.ordered.Categories &&
                                    stateStore.ordered.Categories.length > 0 ? (
                                        stateStore.ordered.Categories.map((obj, index) => {
                                            console.log(obj);
                                            if (obj.is_deleted) {
                                                return <span key={index}></span>;
                                            }
                                            console.log("Returned");
                                            return (
                                                <IonCol key={index}>
                                                    <CategoryItem market_id={market_id} category={obj} shop={shop}/>
                                                </IonCol>
                                            );
                                        })
                                    ) : (
                                        <p></p>
                                    )}</>
                        }

                    </IonRow>
                </IonGrid>
                <CartModal modal={showModal} closeHandler={() => setShowModal(false)}/>
            </IonContent>
        </IonPage>
    );
};

export default Market;
