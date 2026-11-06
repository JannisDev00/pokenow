import '@servicenow/sdk/global'

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                    bom_json: {
                        table: 'sys_module'
                        id: '5ef65426978f4509afaba71fffb9fa96'
                    }
                    br0: {
                        table: 'sys_script'
                        id: 'c9e9723a01614885a3a3e9eab9ba15ef'
                    }
                    cs0: {
                        table: 'sys_script_client'
                        id: '05fa58913616461cb7b170c410811ef6'
                    }
                    'import-all-items': {
                        table: 'sysauto_script'
                        id: '66eb2565e274466a83b542d9dd4b4cf8'
                    }
                    'import-all-pokemon': {
                        table: 'sysauto_script'
                        id: '20700e1e2fff440691e2a028b5afcd42'
                    }
                    'import-pokemon-images': {
                        table: 'sysauto_script'
                        id: 'd4beebe485dc472994b7ee2be1096cef'
                    }
                    'import-type-effectiveness': {
                        table: 'sysauto_script'
                        id: '20172413459e40548d6e02abc0f72b6b'
                    }
                    package_json: {
                        table: 'sys_module'
                        id: '8d03e24e0b51482e9d031746d6b795b5'
                    }
                    pokeapi: {
                        table: 'sys_rest_message'
                        id: 'aff35431c3b54da6ad5e5dfae2683f30'
                    }
                    'pokeapi-download-var-url': {
                        table: 'sys_rest_message_fn_parameters'
                        id: '448529fafa9d4a32b4c607a8667d1178'
                    }
                    'pokeapi-get-item-var-name': {
                        table: 'sys_rest_message_fn_parameters'
                        id: 'a45d2bc848154108923397861e07821b'
                    }
                    'pokeapi-get-move-var-name': {
                        table: 'sys_rest_message_fn_parameters'
                        id: '6c955208a774415086f8f898586a10f6'
                    }
                    'pokeapi-get-type-var-name': {
                        table: 'sys_rest_message_fn_parameters'
                        id: 'b3dbceff9b2c4ab18038e52aa0577926'
                    }
                    'pokeapi-get-var-name': {
                        table: 'sys_rest_message_fn_parameters'
                        id: 'fa2978c67cee49319c899bda188b2851'
                    }
                    'pokeapi-header-accept': {
                        table: 'sys_rest_message_headers'
                        id: '3313372d5d23432bab585a42dc8a7637'
                    }
                    'pokeapi-list-items-param-limit': {
                        table: 'sys_rest_message_fn_param_defs'
                        id: '8823ee6aa4dd48278016fc03e0a5c1f8'
                    }
                    'pokeapi-list-items-param-offset': {
                        table: 'sys_rest_message_fn_param_defs'
                        id: '8b10e6a403504449baecc50228bc32c9'
                    }
                    'pokeapi-list-items-var-limit': {
                        table: 'sys_rest_message_fn_parameters'
                        id: 'a8673bb38aa24391b28bb661f163341f'
                    }
                    'pokeapi-list-items-var-offset': {
                        table: 'sys_rest_message_fn_parameters'
                        id: '6b5320c8260044958f747143d1c95da7'
                    }
                    'pokeapi-list-param-limit': {
                        table: 'sys_rest_message_fn_param_defs'
                        id: '3051d2b80ad24cc6903ebc65e34f7cc2'
                    }
                    'pokeapi-list-param-offset': {
                        table: 'sys_rest_message_fn_param_defs'
                        id: '6eb64a66c67a4dadabb377313358cc28'
                    }
                    'pokeapi-list-var-limit': {
                        table: 'sys_rest_message_fn_parameters'
                        id: '5de13ae5c9dc4a9db82e10dd99f940d9'
                    }
                    'pokeapi-list-var-offset': {
                        table: 'sys_rest_message_fn_parameters'
                        id: 'b8dc6e8ecc3142fdb8ab82b48fd7eb62'
                    }
                    'pokemon-battle-widget': {
                        table: 'sp_widget'
                        id: '5b11ad905d064dcc896491b78efb01f2'
                    }
                    'pokenow-app-menu': {
                        table: 'sys_app_application'
                        id: 'fdad2a283f71410b9a311e2f44427134'
                    }
                    'pokenow-app-module-battle': {
                        table: 'sys_app_module'
                        id: 'c05a5faa302747b9b3c7a378f41d1680'
                    }
                    'pokenow-battle-column': {
                        table: 'sp_column'
                        id: '8a5d770eeb194c1cbe40cbde26bfdc2f'
                    }
                    'pokenow-battle-container': {
                        table: 'sp_container'
                        id: '12d563b3103346aba12af65eb0836d7a'
                    }
                    'pokenow-battle-instance': {
                        table: 'sp_instance'
                        id: '802e0fcbd10e4bea9885d6256404e5e5'
                    }
                    'pokenow-battle-row': {
                        table: 'sp_row'
                        id: 'a4b2e272c5eb4ab285a4296e783c85bf'
                    }
                    'pokenow-portal': {
                        table: 'sp_portal'
                        id: 'ef5c791057e44df385d62824c491e4d9'
                    }
                    'src_server_jobs_import-items_server_js': {
                        table: 'sys_module'
                        id: 'f665f2a136ce4d97a0e75444a4278bd0'
                    }
                    'src_server_jobs_import-pokemon_server_js': {
                        table: 'sys_module'
                        id: '2cb9414a14e74adbb239faaf2b23c3c6'
                    }
                    'src_server_jobs_import-pokemon-images_server_js': {
                        table: 'sys_module'
                        id: '52d2e84a3e8a4e3fa8dc547e87513ca7'
                    }
                    'src_server_jobs_import-type-effectiveness_server_js': {
                        table: 'sys_module'
                        id: 'e7348c39ec2b4e608b654a005dd8ee21'
                    }
                    src_server_script_ts: {
                        table: 'sys_module'
                        id: '93f7a55b6ea0433690adc7a1cad64c30'
                    }
                }
                composite: [
                    {
                        table: 'sys_documentation'
                        id: '03d9a518edf84b11970d89f44f29590d'
                        key: {
                            name: 'x_2270446_pokenow_item_category'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '05976d2ba6a14e2ab9d451b7bf3c0f73'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'power'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '066842da65cd49ae9289d86f40ca773c'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'game_indices'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '098d6ce5b2f34101bc36a2ba79668952'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'abilities'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0a3ac8645662488fb012f2a7699963b7'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'accuracy'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0ac44bb57056496086247171b849764a'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'image_html'
                            position: '0'
                        }
                    },
                    {
                        table: 'sys_ui_section'
                        id: '0aef0a2a1df045bd93692c891a72b8be'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            caption: 'Pokemon'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '0bb5468ad1a048afa88bee98982d3f6e'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'power'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '0bc4eff256b34eb2b8ce7706119503f4'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'name'
                            position: '2'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '0fb4a958158848a0b9083ac87af0b1af'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'stat'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '1081dc38eb0742d88bff52c6e83ea142'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'cries'
                            position: '17'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '10f2a5c64657472aa10f1c21d7a3fd95'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '11669addb6e24cf0a672392864691fb6'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'forms'
                            position: '18'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '120170718bed4d14991495bb168ff66c'
                        key: {
                            name: 'x_2270446_pokenow_stat'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1377241569e24bc1a77a3438148c94b2'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'cost'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_form'
                        id: '13d7bada032843deac565863e7fdf32d'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            view: {
                                id: 'Default view'
                                key: {
                                    name: 'NULL'
                                }
                            }
                            sys_domain: 'global'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '13e82474ac6d45be8a025af52919396e'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'effect'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '141819bf247d40c79e3cbf12b80f8800'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'height'
                            position: '4'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '17969be9090c4be4ae6a7f9cfd6ab65d'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'species'
                            position: '15'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '17edd592e6b04f68a78b354a4c080568'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'past_abilities'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '19789f82c87b4f8ea4656b1c4b01c5b6'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'fling_power'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '19e3f2b847ef4d7cbce5ac2acab8920a'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'game_indices'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1ab529b6649841dc815fce06f55fad32'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'pp'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1bfab5093f564a7a9e0697a7a99a49ca'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'slot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '1c1b3c7aa1754db9b6eebb6687eefbc7'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'machines'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1cb48da22feb4e91ba1045af9be5f367'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'slot'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1cc9ee59f84a406baae263fcfafc3d71'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '1e553c20787e4977a1223441bb834103'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '1f6cc752c0d140309b8a66a0d1482542'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'defending_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '215cad842bbf42108463bbd386513873'
                        key: {
                            name: 'x_2270446_pokenow_stat'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '230e07dd234941bb857c1c02a464a1e0'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'is_default'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '23d1d6973fec4a12a7b7892cb7e53e6f'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'min_turns'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '23f17bbff7e74a99b01d04e0b5784915'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2692a06b27544e66b6dcac92e73f23c5'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'pp'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2717b586de8341968cfb1e537834975a'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'slot'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '272e98d60da24da5929fcd495a4f0381'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'location_area_encounters'
                            position: '10'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '28909b8d2a8f46d8a715290a3356b6fb'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'stats'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '29db3002a51a4ffbb14ebbbd08e0e812'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'pokemon'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '2c570fa1c6b04a4c839d84407d4dca97'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2d0add3897c5411e8cc5f9ee833ed4f0'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'recent_battles'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2da46b55c48d4dcca467ed93cf1b66d9'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'species'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '2f3cb5c81fa44f1b9d5ef16258d4ed36'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'ailment'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '2f64635c46f9473fbc17f2008c5d52fa'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '312b00f5c1d643fda98be0a57e163b61'
                        key: {
                            name: 'x_2270446_pokenow_item'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '3295c880f9564333aab9818015f8425b'
                        key: {
                            name: 'x_2270446_pokenow_type'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '33035f1f4c7f40caa6ff65e0670db744'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'wins'
                            position: '11'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '33d3b0b0a1a24ac7951a43a7558d6603'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3660a2271cad4d3992da61e7b9ff92d4'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'image_html'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '36e117047b8542a19bf581cd1e8176da'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'effort'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '36fedc33fbe041cf846e407056d283b6'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'id'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '37dda072fdf64be198f2bb9613cce4b6'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '3885be39410c4b20ad4df32917f880c3'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'damage_class'
                            value: 'status'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3a99f572cae3465d8ba8aee90f10112e'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'cost'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '3ba9612ff06740ce95bcb7f68348070f'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'attacking_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '3c35e00362024ce382ffdd1da7807695'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'sprites'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '40ac5de86f2f43f4821a514a1ac4fa86'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'past_stats'
                            position: '23'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4829934bda0c46928196cc39294f8fcb'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'flavor_text'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_rest_message_fn'
                        id: '4a38ea4a577e443fa5a6bfdf1e11a728'
                        key: {
                            rest_message: 'aff35431c3b54da6ad5e5dfae2683f30'
                            function_name: 'listPage'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4a98bdde68ff4027860a49f966d2514d'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'past_abilities'
                            position: '22'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4b738021d8ef4f34bb0b1c188308cb2e'
                        key: {
                            name: 'x_2270446_pokenow_item_category'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '4c6a7aebb2954769a0e6db27e650642d'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'losses'
                            position: '12'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '4d6f2b8ff8e14b0cb61cd697b71d9b63'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'pokemon'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '4eb34f4ea23949f092599d229191f862'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'wins'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '50aeba9b28244db69dd5101d1d4a1d8f'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'weight'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '525a46627dd446fa910d8c8112252eba'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'ability'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '5395444507244770983e10c84edaabd9'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'losses'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5571ef1d7c60402cac893135638598d5'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'fling_effect'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '55d7731dfaf64e269b731b9bc081c661'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'flavor_text'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '55e67a98293348968d9f699c6b08d987'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'sprite'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '561cf9638bb94e28a6b0d89aaa262fd2'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'pokemon'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '56e55f06d3224ee4a1b93a070152ed6f'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'defending_type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '57927d54ac82448cb1ec1b85ed6dfc87'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'sprites'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '57db7bd4fea84ef2915ce38250d1f3c8'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'cries'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_rest_message_fn'
                        id: '59118bdb1bc34843b6971c978d44f282'
                        key: {
                            rest_message: 'aff35431c3b54da6ad5e5dfae2683f30'
                            function_name: 'downloadImage'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5bd4abbf1fc9481b801f62df258a7cf0'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'base_experience'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '5bfb3d8f6a5d48e5826a16d9c9a15dd1'
                        key: {
                            name: 'x_2270446_pokenow_stat'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5ce52a2e6bdf4f0e98a0f52527a1633d'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f1c68ef62da43c286e7f8aa41bbdb0f'
                        key: {
                            name: 'x_2270446_pokenow_item_category'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '5f7dbd62cb4b4626838d70e408516dbd'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '60201afb244d4d4f8160a83e3e51eedd'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'is_default'
                        }
                    },
                    {
                        table: 'sys_rest_message_fn'
                        id: '62626012bcf4488ab392fb1024355bbe'
                        key: {
                            rest_message: 'aff35431c3b54da6ad5e5dfae2683f30'
                            function_name: 'getItem'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '644ccf2e2d564b94825286454266d44d'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '660911f7aa5b4512837b42279c9e7e92'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'game_indices'
                            position: '19'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '69bd0f469cca4b79b4cc23169bcb19ca'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                            element: 'attribute'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_rest_message_fn'
                        id: '6adb9e942aaa447cbfd2829e5ab1ef43'
                        key: {
                            rest_message: 'aff35431c3b54da6ad5e5dfae2683f30'
                            function_name: 'getPokemon'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6c13ee87ed0640b8a16501f5a2d48bc8'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'image_html'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6e1741ae477348c6b67987fd2e05491c'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '6f6fc6eefc764fb0848ce29d82f605c8'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'min_turns'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '6fcdeea860344188b9f16b8f2db517b4'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'fling_effect'
                        }
                    },
                    {
                        table: 'sp_page'
                        id: '724e12e3054c425b9abe563cf914ef46'
                        key: {
                            id: 'pokenow-battle'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7366006897264086b4c67a30a0e5ee27'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'damage_class'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '73688458753e482baf9265a49bfca18e'
                        key: {
                            name: 'x_2270446_pokenow_type'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '743b711491234421bcfd71845ea1519b'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7460ffa0586e46ecae9ff600fe0294bf'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '74c558f0ef094d9e9b55b424c87d99b7'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '75e68af76a684e7f9e7e043e940842a7'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '776fb540036a430aa4d8907cd4be5bf9'
                        key: {
                            name: 'x_2270446_pokenow_type'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '78399ee5bb824e8193e50aad08930884'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'recent_battles'
                            position: '14'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '788c3c7781bb49418054453f627c7de9'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'held_items'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '788ca67eae8e453a81451b580333603e'
                        key: {
                            name: 'x_2270446_pokenow_stat'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '78a9c587d4624d0580482a80784e106a'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'recent_battles'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7a2239472f724ad7b8d3fce9d03d347d'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7a411ec832384bbc88b963459fab030f'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7a504c8326224395a5d0a69d611e6c90'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'id'
                            position: '3'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7b0a34c04188476b912b59a3c300a814'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: '7b6c53f9859b41d98c1655073ad4bdd2'
                        key: {
                            name: 'x_2270446_pokenow_move'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '7b965c3b08954005aacf2be600593511'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'stat'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7d1f0c4ca2584ba1a70a29c16ef20d1d'
                        key: {
                            name: 'x_2270446_pokenow_stat'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '7e17a4410b2d4a6d9814ffc84d0e2749'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'order'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '7e67f41446a442228f0db8bdb875f8ce'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.begin_split'
                            position: '1'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '803c217ca60148f482a5b5ab673b9a88'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'image'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '80633b47c00d45ce8b8614abcf86e08b'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'is_hidden'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8079477a0afc43449c868d915718563c'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_rest_message_fn'
                        id: '81e6793b740d4b04a7ea05d5cb22583c'
                        key: {
                            rest_message: 'aff35431c3b54da6ad5e5dfae2683f30'
                            function_name: 'getType'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '828f05f3379c4bb59f5ea4ca7e597d4a'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '82f2c70c7c4b4f64b701ff8c17ffcca3'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'game_indices'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '83a71cd5a38c41df99f51f8f5cfefb69'
                        key: {
                            name: 'x_2270446_pokenow_stat'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '86831e734b514a30b45ac1ab9c09a863'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'abilities'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '881152a2a32e4055b68c0a4e2900523e'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'is_hidden'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '8a9bf95a146942f180aba83b6d6aef74'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'is_default'
                            position: '9'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8af968d153b1410fa00800fbdac6b098'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'past_abilities'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '8c28d8e53edb40d4994ee78d336b2b34'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '8f10a2fbb88d4c80b5d5f61b7f1feef0'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'id'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: '8f10a4e01d884691976459579cfcce06'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'damage_class'
                            value: 'special'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9131cbc6dab344d2bd3636fe464a650c'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'slot'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '936e1c9412e249e6a8a9a4846fa74565'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'order'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '94bd052765b04593880475a944198f54'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'damage_class'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '96a5da1500af45ddb70ee0a5db6dd765'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'types'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '971c4d1059ea499ba4189cace63f64b6'
                        key: {
                            name: 'x_2270446_pokenow_item_category'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '97c1381e8261462c982e850d3a661949'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'base_experience'
                            position: '6'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '97f9f593fb794073b392e00caca0cbe7'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '98714ea4fdf14980b2c573febfaeb5e0'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'forms'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '989f94b9882f40b9bb9b283d73850f1a'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'past_types'
                            position: '24'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a41754e090f465aabce2e5717bf1c85'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'multiplier'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9a6d59985e89462a97b41af51f631cfd'
                        key: {
                            name: 'x_2270446_pokenow_ability'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9a7edc78aba043dcbc1f7a0d99867c67'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9b72f769c963451a9b05eda5fd9eda91'
                        key: {
                            name: 'x_2270446_pokenow_ability'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: '9c0956e573e848af8f325682842007d9'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'past_types'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: '9c27da29495d427ca0b307c94c24c6e6'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9d50ea1996d14d69b45fcd44811a2f27'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'base_stat'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice_set'
                        id: '9ecca82fcb5f47b787f9ddb0d158063b'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'damage_class'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: '9f7a4a6aae4644f1b70e8a6229a2bf04'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'ailment_chance'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: '9f91a5b49acf42a88f23a79dd42e204f'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'held_items'
                            position: '20'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a0501897d0dc4193b337446b5664eadb'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a092c6b4d43f4d46afff05df6fe30d7d'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'location_area_encounters'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a0d7b8138995423aa94f43445b13763e'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'moves'
                            position: '21'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1c4f113003b4ec2ae7bb88fc2320a2a'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'cries'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a1d975597dd543d884dd1bf4a901b49f'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'max_turns'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'a2c9b0a766b34774b7747809a6acfccd'
                        key: {
                            name: 'x_2270446_pokenow_item'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a2fcfa769d5145929a65b0dc0946d6d6'
                        key: {
                            name: 'x_2270446_pokenow_type'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'a3fd0b2edd8e445cb84e529008b87e6a'
                        key: {
                            name: 'x_2270446_pokenow_item_category'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'a5843ff77afe45cb83c0a71fbe0a56ce'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.split'
                            position: '7'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'a69dc88b5fd7457f89602925abf08b84'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'name'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'a7fb415acece46ea8685194da46667b4'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'a974474d5e534485af2dc363c93088bb'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'forms'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'aa2cbc88e6c64f6096fdb68cba53ca48'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ab68e2854e0844e4a6e743d6f370fddb'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'abdfd54218774d64ba68aba8ebeb1e1e'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'ad84341346ab424fa341bc82fc14fab5'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                            element: 'attribute'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'ae64816bee444a879da0e1b7f7a08db6'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: '.end_split'
                            position: '13'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'aeee6b035d094045b2b5db5cee4854fd'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'af0d7a64ac934d1ca9450bd0939db0d1'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'wins'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'af2e08bdcfe0428195d2bf0c78b6f627'
                        key: {
                            name: 'x_2270446_pokenow_item_category'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'af31e0aac7ba49ee9564ea2e9220332a'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'type'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'af8e849945c44ef4baa2502eba69e169'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'weight'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'b1e5f378273b453b8f69ab9a8cd2a44e'
                        key: {
                            name: 'x_2270446_pokenow_ability'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b277a77aea82415cba7d2f4ee9c247f1'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'stats'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b6daecb79d5245c0b30544ecc7e64f55'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'ailment_chance'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'b7bcace0378a41c781a9f034b73cccde'
                        key: {
                            name: 'x_2270446_pokenow_ability'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba47134c4ee34b8fabe590f0c4fcc4b2'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'effect'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ba6f2cdaaa98411d8638da1dc964c83a'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'machines'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'bccbb5539684473da258b2ad87df9264'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                            element: 'ability'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'bd963c57bba848998b2a3a4613203287'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'base_stat'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'be289257f27048a9993ddd66247883ae'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'attacking_type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'be8ee7d13bf147e4a8167a88c6baba17'
                        key: {
                            name: 'x_2270446_pokenow_type'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c183cbb69c2b4bbdb2e4c6666b00a6ff'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'past_stats'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c2f9cd9da52e436db5c28e56a7effb6d'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                            element: 'item'
                        }
                    },
                    {
                        table: 'sys_rest_message_fn'
                        id: 'c45003cf589a485ab74cb451e7bdcb16'
                        key: {
                            rest_message: 'aff35431c3b54da6ad5e5dfae2683f30'
                            function_name: 'listItems'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'c546507d7be347cf8825fff9af3f8121'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'base_experience'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'c59fa0952dac450b9c7fc4188c3cddf6'
                        key: {
                            name: 'x_2270446_pokenow_type'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c787cbff4ee24c9a84275b9ead5c6bcf'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'c7c7da19fe0246c189b7efa21b8d15d3'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'game_indices'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cb48307883fe48298e1ce225084f77d3'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'pokemon'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cc62be0eba974957a0e1b08bb313aae0'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'moves'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'cc90a5777703420faccad12d0f5d4513'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'sprite'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ccadb78a45ff4b9889917c3722877ad2'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'max_turns'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cdf1f14960c8475aac428b963694f99e'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'weight'
                            position: '5'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'cf77392b6ab34bfe8cffa62cc234c088'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute_map'
                            element: 'item'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'cfc4187dc10f44acadf29a974dd435f4'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'sprites'
                            position: '16'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd5403a3a821b40e28d571503fff02c82'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'held_items'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd6b4a22fcc4f4d3fadf347d0c3b5501a'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'category'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd6f763ec2cb949b7a4381a90c777695d'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'fling_power'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_rest_message_fn'
                        id: 'd7160d8e2d0146c488fdb6dad8e24c4b'
                        key: {
                            rest_message: 'aff35431c3b54da6ad5e5dfae2683f30'
                            function_name: 'getMove'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd8365cf424d949f6997c784a263707e6'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'losses'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'd9a9bc4c80a047a0b635d2c8c54fa55d'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'past_types'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dc116712e5b34ea5ac41603e6ed28607'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dd328966032445ba90cc9b3a84a4ebe6'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'species'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'dd9499d263534aaeb1e95a96ca157785'
                        key: {
                            name: 'x_2270446_pokenow_item'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'dddf19af59624ac88202b33c398c4f4f'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'accuracy'
                        }
                    },
                    {
                        table: 'sys_ui_form_section'
                        id: 'dede3fb4ce6846b4a71e1df733a5adbb'
                        key: {
                            sys_ui_form: {
                                id: '13d7bada032843deac565863e7fdf32d'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'dee27b65225c4eb2acc888542d1db3b3'
                        key: {
                            name: 'x_2270446_pokenow_ability'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'df0d68586d504513bc0e7b07e08fca9f'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'dfb90f916b644eacac1c393a7b1ed2c4'
                        key: {
                            name: 'x_2270446_pokenow_poke_ability'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e1292ad4a39b45fc8e5123bf76b23afe'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'types'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e6db7063fd7d416c84c0628d173270e5'
                        key: {
                            name: 'x_2270446_pokenow_ability'
                            element: 'name'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'e7a60062eb39423d836a202793b8713d'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'e9b5ede75d7d4c32b7fcc43f8624c223'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute'
                            element: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'eac08bdce1ca4c6788d52aad5930fec9'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'id'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'ecd35a43198649a08b523b6957de999e'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'name'
                            language: 'en'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'eded63697f4b476cbe3cac18e03330e0'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                        }
                    },
                    {
                        table: 'ua_table_licensing_config'
                        id: 'eeaf1fb2f191473cab55e4dcffd9b850'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f023199f97fc4e939bfbe46f4020c519'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'location_area_encounters'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_ui_element'
                        id: 'f05b4508afb84997b5e4265bdf105b6b'
                        key: {
                            sys_ui_section: {
                                id: '0aef0a2a1df045bd93692c891a72b8be'
                                key: {
                                    name: 'x_2270446_pokenow_attributes'
                                    caption: 'Pokemon'
                                    view: {
                                        id: 'Default view'
                                        key: {
                                            name: 'NULL'
                                        }
                                    }
                                    sys_domain: 'global'
                                }
                            }
                            element: 'order'
                            position: '8'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f107c0d9e7674e35ba50d036ed34c7e9'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'height'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f20ccab5079241b0a9af829a897a3bcf'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'effort'
                        }
                    },
                    {
                        table: 'sys_db_object'
                        id: 'f328702431184b4eb66c2a9c7c80300d'
                        key: {
                            name: 'x_2270446_pokenow_move'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f53e11e26f574b9d88112af87e003442'
                        key: {
                            name: 'x_2270446_pokenow_poke_stat'
                            element: 'pokemon'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f5b5fd96a8c249f1a5d03a963c24cd77'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'pokemon'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f8181c5b59aa4b2cb67f689615897089'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'f9c39e5932bd43a1af518ba4d6156602'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'past_stats'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'f9e4dfc5d0b24efba0943919ea187dfa'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'ailment'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fa2d6c4d6c87466091e35202a7343733'
                        key: {
                            name: 'x_2270446_pokenow_poke_type'
                            element: 'type'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_choice'
                        id: 'fa9aabb0c3b345a0869e79765e2bffc5'
                        key: {
                            name: 'x_2270446_pokenow_move'
                            element: 'damage_class'
                            value: 'physical'
                            language: 'en'
                            dependent_value: 'NULL'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fad623bcba754be281be2854552392a7'
                        deleted: true
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'image'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fb895c96f9fa4eebb04e5be005898fd5'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'height'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fbb3c32056f64cf4ba0d4a452baa108a'
                        key: {
                            name: 'x_2270446_pokenow_item_attribute'
                            element: 'NULL'
                            language: 'en'
                        }
                    },
                    {
                        table: 'sys_dictionary'
                        id: 'fc87f97156064a2b8fb17cede080756d'
                        key: {
                            name: 'x_2270446_pokenow_attributes'
                            element: 'moves'
                        }
                    },
                    {
                        table: 'sys_documentation'
                        id: 'fd71ec1afdfc47e0a66941fdb39342d7'
                        key: {
                            name: 'x_2270446_pokenow_type_effectiveness'
                            element: 'multiplier'
                            language: 'en'
                        }
                    },
                ]
            }
        }
    }
}
