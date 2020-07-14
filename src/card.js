class Card extends React.Component {
    render() {
      const profile = this.props;
      return (
        <div className="relative border-2 border-gray-400 rounded-lg flex flex-wrap justify-around">
          <div className="absolute left-0 ml-24 bg-red-900 border-blue-500 border-l-4 h-full z-0"></div>
  
          <div className="flex flex-wrap p-8 z-10">
            <div className="border-4 border-blue-500 rounded-full">
              <img
                className="h-32 w-32 border-4 border-blue-900 rounded-full"
                src={profile.avatar}
              />
            </div>
            <div className="ml-4 pt-8 justify-center">
              <p> {profile.login1} </p>
              <p> {profile.location1} </p>
              <p>
                <span className="m-4"> {profile.repos} </span>
                <span className="m-4">{profile.followers1}</span>
                <span className="m-4">{profile.following1}</span>
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
  
  const CardList = (props) => (
    <div>
      {props.profilesCard.map((profile) => (
        <div>
          <Card key={profile.id} {...profile} />
        </div>
      ))}
    </div>
  );
  
  class Form extends React.Component {
    state = {
      login1 ="",
      userName: "",
      location1: "",
      avatar: "",
      repos: "",
      followers1: "",
      following1: ""
    };
  
    changeState = async (e) => {
      e.preventDefault();
  
      var [
        login,
        location,
        avatar_url,
        name,
        public_repos,
        followers,
        following
      ] = await axios.get(`https://api.github.com/users/${this.state.login}`);
      this.setState({ login1: login });
      this.setState({ location1: location });
      this.setState({ avatar: avatar_url });
      this.setState({ userName: name });
      this.setState({ repos: public_repos });
      this.setState({ followers1: followers });
      this.setState({ following1: following });
      this.props.dataApp(this.state);
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.changeState}>
            <label className="pr-2 text-xl tracking-wide leading-loose font-bold ">
              Username :
            </label>
            <input
              className="p-2 border-2 border-blue-800 text-center rounded-lg"
              placeholder="Github username"
              type="text"
              value={this.state.login1}
              onChange={(event) => this.setState({ login1: event.target.value })}
            />
            <button className="p-2 m-2 border-2 rounded-lg bg-blue-800 text-gray-400 hover:bg-blue-500">
              {" "}
              Search{" "}
            </button>
          </form>
        </div>
      );
    }
  }
  
  class App extends React.Component {
    state = {
      profiles: []
    };
  
    dataAppp = (propsData) => {
      /*this.setState(prevState => ({
        profiles: [...prevState.profiles, propsData],
      })); */
      this.setState((prevState) => ({
        profiles: [...prevState.profiles, propsData]
      }));
    };
  
    render() {
      return (
        <div className="flex flex-col flex-wrap justify-center items-center">
          <h2 className="text-4xl font-bold"> The GitHub Cards App </h2>
          <Form dataApp={this.dataAppp} />
          <CardList profilesCard={this.state.profiles} />
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.getElementById("app"));