import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import {
  useAddBankMutation,
  useAllBanksQuery,
  useChangeBankMutation,
  useCountBanksQuery,
  useDeleteBankMutation,
} from "../../store/generated/graphql";
import Header from "../Header/Header";
import ListItem from "../ListItem/ListItem";
import Loading from "../Loading/Loading";
import PaginationFC from "../Pagination/Pagination";
import s from "./ListPage.module.css";
import { NetworkStatus } from "@apollo/client";
import ErrorPage from "../ErrorPage/ErrorPage";
import { showSuccess } from "../../utils/showSucces";
import { showError } from "../../utils/showError";
import AddBankModal from "../AddBankModal/AddBankModal";
import DeleteBankModal from "../DeleteBankModal/DeleteBankModal";
import ChangeBankModal from "../ChangeBankModal/ChangeBankModal";
import { useHistory } from "react-router";

interface ListPagePropsType {}

const ListPage: React.FC = () => {
  const history = useHistory();

  const TAKE = 5;

  const [page, setPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState<number>(0); //save here bank's id to delete in the modal
  const [openChange, setOpenChange] = useState<number>(0); //save here bank's id to change in the modal

  const {
    data: dataBanks,
    loading: loadingBanks,
    error: errorBanks,
    fetchMore: fetchMoreBanks,
    networkStatus: networkStatusBanks,
  } = useAllBanksQuery({
    variables: {
      banksSkip: (page - 1) * TAKE,
      banksTake: TAKE,
    },
  });

  const {
    data: dataCount,
    loading: loadingCount,
    error: errorCount,
  } = useCountBanksQuery();

  const [
    deleteBank,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useDeleteBankMutation({
    refetchQueries: ["AllBanks", "CountBanks"],
    onCompleted(data) {
      data.deleteBank
        ? showSuccess("The Bank has been deleted!")
        : showError("Error. The Bank hasn't been deleted!");

    },
    onError(error) {
      showError("Error. The Bank hasn't been deleted!");
    },
  });

  const [
    addBank,
    { data: dataAddBank, loading: loadingAddBank, error: errorAddBank },
  ] = useAddBankMutation({
    refetchQueries: ["AllBanks", "CountBanks"],
    onCompleted(data) {
      data.addBank
        ? showSuccess("The Bank has been added!")
        : showError("Error. The Bank hasn't been added!");
    },
    onError(error) {
      showError("Error. The Bank hasn't been added!");
    },
  });

  const [
    changeBank,
    {
      data: dataChangeBank,
      loading: loadingChangeBank,
      error: errorChangeBank,
    },
  ] = useChangeBankMutation({
    refetchQueries: ["AllBanks", "CountBanks"],
    onCompleted(data) {
      data.changeBank
        ? showSuccess("The Bank has been changed!")
        : showError("Error. The Bank hasn't been changed!");
    },
    onError(error) {
      showError("Error. The Bank hasn't been changed!");
    },
  });

  useEffect(() => {
    fetchMoreBanks({
      variables: {
        skip: (page - 1) * TAKE,
        take: TAKE,
      },
    });
  }, [page]);

  if (
    errorBanks ||
    errorAddBank ||
    errorCount ||
    errorDelete ||
    errorChangeBank
  ) {
    return <ErrorPage />;
  }

  return (
    <>
      {openAdd && (
        <AddBankModal
          isShow={openAdd}
          setShow={setOpenAdd}
          addMutation={(args) =>
            addBank({
              variables: args,
            })
          }
        />
      )}
      {Boolean(openDelete) && (
        <DeleteBankModal
          isShow={openDelete}
          name={
            dataBanks?.banks?.filter((obj) => obj?.id === String(openDelete))[0]
              ?.name!
          }
          setShow={setOpenDelete}
          addMutation={() =>
            deleteBank({
              variables: {
                id: String(openDelete),
              },
            })
          }
        />
      )}
      {Boolean(openChange) && (
        <ChangeBankModal
          isShow={openChange}
          setShow={setOpenChange}
          data={
            dataBanks!.banks!.filter(
              (obj) => obj?.id === String(openChange)
            )[0]!
          }
          addMutation={(args) =>
            changeBank({
              variables: args,
            })
          }
        />
      )}
      <Header
        btnOnClick={() => setOpenAdd(true)}
        text={"Add new Bank"}
        color={"success"}
        position={"end"}
        icon={"bi bi-plus-circle"}
        secondBtn={true}
        secBtnOnClick={() => history.push("/calculation")}
        secText={"Calculate mortgage"}
      />
      <div>
        <Container className={s.container}>
          {loadingAddBank ||
          loadingBanks ||
          loadingCount ||
          loadingDelete ||
          loadingChangeBank ||
          networkStatusBanks === NetworkStatus.refetch ? (
            <Loading />
          ) : (
            <>
              <ListGroup>
                {dataBanks && dataBanks!.banks!.length > 0 ? (
                  dataBanks!.banks!.map((item) => (
                    <ListItem
                      deleteClb={() => setOpenDelete(+item?.id!)}
                      changeClb={() => setOpenChange(+item?.id!)}
                      key={item?.id}
                      name={item?.name!}
                      id={item?.id!}
                      img={item?.image!}
                    />
                  ))
                ) : (
                  <div className={s.empty}>The List is empty</div>
                )}
              </ListGroup>
              <PaginationFC
                page={page}
                setPage={setPage}
                pageSize={TAKE}
                allCount={dataCount?.countBanks!}
              />
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default ListPage;
