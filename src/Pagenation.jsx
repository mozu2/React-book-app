import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "./features/page/pageSlice";


const Pagenation = () => {

    const dispatch = useDispatch();
    const offset = useSelector((state) => state.page.offset);

    return (
        <>
            <div className="flex justify-center text-xl">
                <button
                    className=" rounded-md px-3 py-3 mx-3 my-3 bg-white"
                    onClick={() => dispatch(prevPage())}
                    disabled={offset === 0}
                >
                    前に
                </button>
                <button
                    className=" rounded-md px-3 py-3 mx-3 my-3 bg-white"
                    onClick={() => dispatch(nextPage())}

                >
                    次に
                </button>
            </div>
        </>
    )
}

export default Pagenation;