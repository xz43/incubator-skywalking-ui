/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { base } from '../utils/models';

export default base({
  namespace: 'topology',
  state: {
    getGlobalTopology: {
      nodes: [],
      calls: [],
    },
  },
  dataQuery: `
    query Topology($duration: Duration!) {
      getGlobalTopology(duration: $duration) {
        nodes {
          id
          name
          type
          isReal
        }
        calls {
          source
          target
          callType
          cpm
        }
      }
    }
  `,
  reducers: {
    filterApplication(preState, { payload: { aa } }) {
      const { variables } = preState;
      if (aa.length < 1) {
        const newVariables = { ...variables };
        delete newVariables.appRegExps;
        delete newVariables.appFilters;
        return {
          ...preState,
          variables: newVariables,
        };
      }
      return {
        ...preState,
        variables: {
          ...variables,
          appFilters: aa,
          appRegExps: aa.map((a) => {
            try {
              return new RegExp(a, 'i');
            } catch (e) {
              return null;
            }
          }),
        },
      };
    },
  },
});
