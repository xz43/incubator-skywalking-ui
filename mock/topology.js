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


import mockjs from 'mockjs';

export default {
  getServiceTopology: () => {
    const upNodes = mockjs.mock({
      'nodes|1-5': [
        {
          'id|+1': 100,
          name: '@url',
          'type|1': ['DUBBO', 'USER', 'SPRINGMVC'],
        },
      ],
    });
    const centerNodes = mockjs.mock({
      nodes: [
        {
          'id|+1': 1,
          name: '@url',
          'type|1': ['DUBBO', 'tomcat', 'SPRINGMVC'],
        },
      ],
    });
    const downNodes = mockjs.mock({
      'nodes|2-5': [
        {
          'id|+1': 200,
          name: '@url',
          'type|1': ['Oracle', 'MYSQL', 'REDIS'],
        },
      ],
    });
    downNodes.nodes.push({ id: -111 });
    const nodes = upNodes.nodes.concat(centerNodes.nodes, downNodes.nodes);
    const calls = upNodes.nodes.map(node => (mockjs.mock({
      source: node.id,
      target: 1,
      'isAlert|1': true,
      'callType|1': ['rpc', 'http', 'dubbo'],
      'cpm|0-1000': 1,
    }))).concat(downNodes.nodes.map(node => (mockjs.mock({
      source: 1,
      target: node.id,
      'isAlert|1': true,
      'callType|1': ['rpc', 'http', 'dubbo'],
      'cpm|0-2000': 1,
    }))));
    calls.push({ source: '-175', target: 1, isAlert: false, callType: 'GRPC', cpm: 0, avgResponseTime: 52 });
    return {
      nodes,
      calls,
    };
  },
  getGlobalTopology: () => {
    const application = mockjs.mock({
      'nodes|2-3': [
        {
          'id|+1': 2,
          name: '@name',
          'type|1': ['DUBBO', 'tomcat', 'SPRINGMVC'],
          isReal: true,
        },
      ],
    });
    const users = mockjs.mock({
      nodes: [
        {
          id: 1,
          name: 'User',
          type: 'USER',
          isReal: false,
        },
      ],
    });
    const resources = mockjs.mock({
      'nodes|5': [
        {
          'id|+1': 200,
          name: '@name',
          'type|1': ['Oracle', 'MYSQL', 'REDIS'],
          isReal: false,
        },
      ],
    });
    const nodes = users.nodes.concat(application.nodes, resources.nodes);
    const userConnectApplication = mockjs.mock({
      calls: [
        {
          source: 1,
          target: 2,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
        {
          source: 2,
          target: 3,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
        {
          source: 3,
          target: 2,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
        {
          source: 2,
          target: 200,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
        {
          source: 2,
          target: 201,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
        {
          source: 3,
          target: 202,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
        {
          source: 3,
          target: 203,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
        {
          source: 3,
          target: 204,
          'callType|1': ['rpc', 'http', 'dubbo'],
          'cpm|100-2000': 1,
        },
      ],
    });
    return {
      nodes,
      calls: userConnectApplication.calls,
    };
  },
  getTopology(req, res) {
    res.json(mockjs.mock(
      {
        data: {
          getClusterTopology: () => {
            const application = mockjs.mock({
              'nodes|2-3': [
                {
                  'id|+1': 1,
                  name: '@name',
                  'type|1': ['DUBBO', 'tomcat', 'SPRINGMVC'],
                  'cpm|10-2000': 1,
                  'sla|1-100.1-2': 1,
                  'apdex|0.2': 1,
                  'avgResponseTime|500-1000': 1,
                  'isAlarm|1': true,
                  'numOfServer|1-100': 1,
                  'numOfServerAlarm|1-100': 1,
                  'numOfServiceAlarm|1-100': 1,
                },
              ],
            });
            const users = mockjs.mock({
              nodes: [
                {
                  id: 100,
                  name: 'User',
                  type: 'USER',
                },
              ],
            });
            const resources = mockjs.mock({
              'nodes|5': [
                {
                  'id|+1': 200,
                  name: '@name',
                  'type|1': ['Oracle', 'MYSQL', 'REDIS'],
                },
              ],
            });
            const nodes = users.nodes.concat(application.nodes, resources.nodes);
            const userConnectApplication = mockjs.mock({
              calls: [
                {
                  source: 100,
                  target: 1,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
                {
                  source: 1,
                  target: 2,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
                {
                  source: 2,
                  target: 1,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
                {
                  source: 1,
                  target: 200,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
                {
                  source: 1,
                  target: 201,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
                {
                  source: 2,
                  target: 202,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
                {
                  source: 2,
                  target: 203,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
                {
                  source: 2,
                  target: 204,
                  'isAlert|1': true,
                  'callType|1': ['rpc', 'http', 'dubbo'],
                  'cpm|100-2000': 1,
                  'avgResponseTime|500-5000': 1,
                },
              ],
            });
            return {
              nodes,
              calls: userConnectApplication.calls,
            };
          },
        },
      }
    ));
  },
};
