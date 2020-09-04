export default function ({redirect, store}) {
  console.log(store.state.username);
  if (store.state.username === '' || store.state.username === undefined) {
    return redirect('/login');
  }
}
