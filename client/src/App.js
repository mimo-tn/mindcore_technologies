// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import ButtonAppBar from './components/ButtonAppBar';
// import SelectedListItem from './components/SelectedListItem';
// import PageContainerBasic from './components/PageContainerBasic';
// import InBox from './components/InBox';

// export default function App() {
//   return (
//     <>
//       <ButtonAppBar />
//       <div style={{ display: 'flex', height: '100vh' }}>
//         <SelectedListItem />
//         <Routes>
//           <Route path="/" element={<PageContainerBasic content="Welcome to the Dashboard" />} />
//           <Route path="/inbox" element={<InBox content="Inbox Content" />} />
//           <Route path="/drafts" element={<PageContainerBasic content="Drafts Content" />} />
//           <Route path="/trash" element={<PageContainerBasic content="Trash Content" />} />
//           <Route path="/spam" element={<PageContainerBasic content="Spam Content" />} />
//         </Routes>
//       </div>
//     </>
//   );
// }
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar';
import SelectedListItem from './components/SelectedListItem';
import PageContainerBasic from './components/PageContainerBasic';
import InBox from './components/InBox';

export default function App() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <>
            <ButtonAppBar onToggle={() => setIsCollapsed(!isCollapsed)} />
            <div style={{ display: 'flex', height: '100vh' }}>
                <SelectedListItem collapsed={isCollapsed} />
                <Routes>
                    <Route path="/" element={<PageContainerBasic content="Welcome to the Dashboard" />} />
                    <Route path="/inbox" element={<InBox content="Inbox Content" />} />
                    <Route path="/drafts" element={<PageContainerBasic content="Drafts Content" />} />
                    <Route path="/trash" element={<PageContainerBasic content="Trash Content" />} />
                    <Route path="/spam" element={<PageContainerBasic content="Spam Content" />} />
                </Routes>
            </div>
        </>
    );
}
