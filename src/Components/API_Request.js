
const apiRequest = async (url = '', objectRequest = null, errMsg = null) => {

    try {
        const response = await fetch(url, objectRequest);
        if(!response.ok)  throw Error("Please reload the app");
    }
    catch(err) {
        errMsg = err.Message;
    }
    finally {
        return errMsg;
    }
}

export default apiRequest;