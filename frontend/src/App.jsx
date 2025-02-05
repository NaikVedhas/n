import Layout from "./Layout"
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home"
import NotFound  from "./pages/NotFound";
import { createBrowserRouter,Route,createRoutesFromElements,RouterProvider, Navigate } from "react-router"
import toast, { Toaster } from "react-hot-toast";   
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import Notifications from "./pages/Notifications";
import Network from "./pages/Network";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import ProfileViewers from "./pages/ProfileViewers";
import Myactivity from "./pages/Myactivity";
import SearchUser from "./pages/SearchUser";
import Message from "./pages/Message";

function App() {
  
  //So whenver we refresh the website then our authUser is runned again and we check the user now we dont have to put the function in useffect of app.jsx bec react query automatically fetched this.
  // Usequery fetches the data when reload,Cache Expiration (Stale Time),On Network Reconnect,On Window Focus (Default Behavior) ie switching tabs(You can disable this by setting refetchOnWindowFocus: false.) and ofc on component mount. If we dont use this then we have manually add fetching in useffect 

  //We want the info of user who has logged in becasuse in login function in backedn we are sending just a message thet user has loggedin successfully and not his data. So we have createda  additional function called getme
  
  const {data:authUser,isLoading} = useQuery({  //in usequery we dont have the onSuccess and Onerror prop so we do try catch inside. and in useMutation we have that 
    queryKey:["authUser"],    //by this key we can fetch this same data in any component by just writing - const {data:authUser,isLoading} = useQuery({queryKey:["authUser"]}); and now we hot the same data in authUser. querykey meinkcuh bhi likh sakte hai ha. in usequrey we have data as the default variable 
    queryFn:async () =>{
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;        //now this res.data will be stored in data:authUser
      } catch (error) {
         if(error && error?.status===401){
          return null;
         }
         toast.error("Something went wrong please try again later");        
      }
    }
    
  });
      

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route path="" element={authUser? <Home/>:<Navigate to={"/login"}/>} />
        <Route path="login" element={!authUser ?<Login/>:<Navigate to={"/"}/>}/>
        <Route path="signup" element={!authUser?<Signup/>:<Navigate to={"/"}/>}/>
        <Route path="/notifications" element={authUser? <Notifications/>:<Navigate to={"/login"}/>} />
        <Route path="/network" element={authUser? <Network/>:<Navigate to={"/login"}/>} />
        <Route path="/posts/:postId" element={authUser? <PostPage/>:<Navigate to={"/login"}/>} />
        <Route path="/profile/:username" element={authUser? <Profile/>:<Navigate to={"/login"}/>} />
        <Route path={"/message"} element={ authUser? <Message/> : <Navigate to={"/login"} />} />
        <Route path="/profileViewers" element={authUser? <ProfileViewers/>:<Navigate to={"/login"}/>} />
        <Route path="/search" element={authUser? <SearchUser/>:<Navigate to={"/login"}/>} />
        <Route path="/myactivity" element={authUser? <Myactivity/>:<Navigate to={"/login"}/>} />
        <Route path="*" element={<NotFound/>}/> 
      </Route>
    )
  );


  return (
    <>
    {isLoading ? null :<RouterProvider router={router}/>} 
    <Toaster /> 
    </>
  )
  //we send null in user when we are getting the user info bec if he is not login and goes on home page and website is taking time to check the user is login or not at that loading time also he doesnt see the home page  
}

export default App
